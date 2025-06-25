import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import { Font } from './entity/fonts';
import { fontService } from './service/fontService';
import * as path from 'path';
import * as fs from 'fs';
import multer from 'multer';
import { In } from 'typeorm';

const app: Express = express();

// CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './fonts';
    // Ensure fonts directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    // Save files to the fonts directory
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Unique filename with timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const PORT: number = parseInt(process.env.PORT || '3000');

app.get('/', (req: Request, res: Response) => {
  res.send('Type Tester Backend is running!');
});

// Route to fetch all fonts
app.get('/api/fonts', async (req, res) => {
  const langIds = req.query.langIds 
    ? Array.isArray(req.query.langIds)
      ? req.query.langIds.map(id => parseInt(id as string))
      : [parseInt(req.query.langIds as string)]
    : [];

  let fonts;
  if (langIds.length > 0) {
    fonts = await AppDataSource.manager
      .createQueryBuilder(Font, 'font')
      .leftJoinAndSelect('font.languages', 'language')
      .where('language.id IN (:...langIds)', { langIds })
      .getMany();
  } else {
    fonts = await AppDataSource.manager.find(Font, { relations: ['languages'] });
  }

  res.json(fonts.map(font => ({
    ...font,
    languages: font.languages.map(l => l.name),
  })));
});
// Route to upload a font file
app.post('/api/fonts', upload.single('fontFile'), async (req, res) => {
  if (!req.file) {
    res.status(400).send('No font file uploaded');
    return;
  }
  const { name, fontSize } = req.body;
  const langIds = req.body.lang_id
    ? (Array.isArray(req.body.lang_id)
        ? req.body.lang_id.map((id: string) => parseInt(id))
        : [parseInt(req.body.lang_id)])
    : [];

  if (!name || langIds.length === 0) {
    res.status(400).send('Name and at least one language ID are required');
    return;
  }

  const filePath = path.join('./fonts', req.file.filename);
  await fontService.saveFontToDB(name, filePath, langIds);

  res.status(201).json({ message: 'Font uploaded', filePath });
});

// Route to serve font files
app.get('/api/fonts/:fileName', (req: Request, res: Response) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'fonts', fileName);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Font file not found');
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    console.log('DB_HOST=localhost');
    console.log('DB_PORT=3306');
  });