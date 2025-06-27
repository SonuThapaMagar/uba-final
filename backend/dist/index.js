"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const fonts_1 = require("./entity/fonts");
const fontService_1 = require("./service/fontService");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
// CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON
app.use(express_1.default.json());
// Multer config for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './fonts';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const PORT = parseInt(process.env.PORT || '3000');
// Route to fetch fonts with filtering, sorting, and pagination
app.get('/api/fonts', async (req, res) => {
    const langIds = req.query.langIds
        ? Array.isArray(req.query.langIds)
            ? req.query.langIds.map(id => parseInt(id))
            : [parseInt(req.query.langIds)]
        : [];
    const searchTerm = req.query.searchTerm;
    const sortOption = req.query.sortOption;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    try {
        let query = database_1.AppDataSource.manager
            .createQueryBuilder(fonts_1.Font, 'font')
            .leftJoinAndSelect('font.languages', 'language');
        // Apply language filter
        if (langIds.length > 0) {
            query = query.where('language.id IN (:...langIds)', { langIds });
        }
        // Apply search term filter
        if (searchTerm) {
            query = query.andWhere('font.name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
        }
        // Apply sorting
        if (sortOption) {
            if (sortOption === 'az') {
                query = query.orderBy('font.name', 'ASC');
            }
            else if (sortOption === 'za') {
                query = query.orderBy('font.name', 'DESC');
            }
            else if (sortOption === 'new') {
                query = query.orderBy('font.id', 'DESC');
            }
            else if (sortOption === 'popular') {
                query = query.orderBy('font.popularity', 'DESC');
            }
        }
        else {
            query = query.orderBy('font.id', 'DESC');
        }
        // Apply pagination
        query = query.skip((page - 1) * perPage).take(perPage);
        // Get fonts and total count
        const [fonts, total] = await query.getManyAndCount();
        res.json({
            fonts: fonts.map(font => ({
                id: font.id,
                name: font.name,
                filePath: font.filePath,
                fontSize: font.fontSize || 16, // Include fontSize
                languages: font.languages.map(l => l.name),
            })),
            total,
            totalPages: Math.ceil(total / perPage),
            currentPage: page,
        });
    }
    catch (error) {
        console.error('Error fetching fonts:', error);
        res.status(500).send('Error fetching fonts');
    }
});
// Route to upload a font file
app.post('/api/fonts', upload.single('fontFile'), async (req, res) => {
    if (!req.file) {
        res.status(400).send('No font file uploaded');
        return;
    }
    const { name, fontSize } = req.body;
    const langIds = req.body.lang_id
        ? Array.isArray(req.body.lang_id)
            ? req.body.lang_id.map((id) => parseInt(id))
            : [parseInt(req.body.lang_id)]
        : [];
    if (!name || langIds.length === 0) {
        res.status(400).send('Name and at least one language ID are required');
        return;
    }
    const filePath = path.join('./fonts', req.file.filename);
    await fontService_1.fontService.saveFontToDB(name, filePath, langIds, parseInt(fontSize) || 16);
    res.status(201).json({ message: 'Font uploaded', filePath });
});
// Route to serve font files and increment popularity
app.get('/api/fonts/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'fonts', fileName);
    // Increment popularity for the font
    try {
        const font = await database_1.AppDataSource.manager.findOne(fonts_1.Font, {
            where: { filePath: path.join('./fonts', fileName) },
        });
        if (font) {
            font.popularity += 1;
            await database_1.AppDataSource.manager.save(font);
        }
    }
    catch (error) {
        console.error('Error updating font popularity:', error);
    }
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    }
    else {
        res.status(404).send('Font file not found');
    }
});
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Initialize database connection
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected!');
})
    .catch((err) => {
    console.error('Database connection error:', err);
    console.log('DB_HOST=localhost');
    console.log('DB_PORT=3306');
});
