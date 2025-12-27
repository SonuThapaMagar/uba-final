import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import { Font } from './entity/fonts';
import { fontService } from './service/fontService';
import * as path from 'path';
import * as fs from 'fs';
import multer from 'multer';

const app: Express = express();

// CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './fonts';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const PORT: number = parseInt(process.env.PORT || '3000');

// Route to fetch fonts with filtering, sorting, and pagination
app.get('/api/fonts', async (req: Request, res: Response) => {
  const langIds = req.query.langIds
    ? Array.isArray(req.query.langIds)
      ? req.query.langIds.map(id => parseInt(id as string))
      : [parseInt(req.query.langIds as string)]
    : [];
  const searchTerm = req.query.searchTerm as string | undefined;
  const sortOption = req.query.sortOption as string | undefined;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;

  try {
    let query = AppDataSource.manager
      .createQueryBuilder(Font, 'font')
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
      } else if (sortOption === 'za') {
        query = query.orderBy('font.name', 'DESC');
      } else if (sortOption === 'new') {
        query = query.orderBy('font.id', 'DESC');
      } else if (sortOption === 'popular') {
        query = query.orderBy('font.popularity', 'DESC');
      }
    } else {
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
  } catch (error) {
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
      ? req.body.lang_id.map((id: string) => parseInt(id))
      : [parseInt(req.body.lang_id)]
    : [];

  if (!name || langIds.length === 0) {
    res.status(400).send('Name and at least one language ID are required');
    return;
  }

  const filePath = path.join('./fonts', req.file.filename);
  await fontService.saveFontToDB(name, filePath, langIds, parseInt(fontSize) || 16);

  res.status(201).json({ message: 'Font uploaded', filePath });
});

// Route to serve font files and increment popularity
app.get('/api/fonts', async (req: Request, res: Response) => {
  const langIds = req.query.langIds
    ? Array.isArray(req.query.langIds)
      ? req.query.langIds.map(id => parseInt(id as string))
      : [parseInt(req.query.langIds as string)]
    : [];
  const searchTerm = req.query.searchTerm as string | undefined;
  const sortOption = req.query.sortOption as string | undefined;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;

  try {
    let query = AppDataSource.manager
      .createQueryBuilder(Font, 'font')
      .leftJoinAndSelect('font.languages', 'language');

    console.log('Lang IDs:', langIds); // Debug log
    console.log('Search Term:', searchTerm); // Debug log
    console.log('Sort Option:', sortOption); // Debug log

    // Apply language filter
    if (langIds.length > 0) {
      query = query.andWhere('language.id IN (:...langIds)', { langIds });
    }

    // Apply search term filter
    if (searchTerm) {
      query = query.andWhere('font.name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
    }

    // Apply sorting
    if (sortOption) {
      if (sortOption === 'az') {
        query = query.orderBy('font.name', 'ASC');
      } else if (sortOption === 'za') {
        query = query.orderBy('font.name', 'DESC');
      } else if (sortOption === 'new') {
        query = query.orderBy('font.id', 'DESC');
      } else if (sortOption === 'popular') {
        query = query.orderBy('font.popularity', 'DESC');
      }
    } else {
      query = query.orderBy('font.id', 'DESC');
    }

    // Apply pagination
    query = query.skip((page - 1) * perPage).take(perPage);

    // Get fonts and total count
    const [fonts, total] = await query.getManyAndCount();
    console.log('Fetched fonts:', fonts); // Debug log

    res.json({
      fonts: fonts.map(font => ({
        id: font.id,
        name: font.name,
        filePath: font.filePath,
        fontSize: font.fontSize || 16,
        languages: font.languages.map(l => l.name),
      })),
      total,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    });
  } catch (error:any) {
    console.error('Error fetching fonts:', error);
    res.status(500).json({ error: 'Error fetching fonts', details: error.message });
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