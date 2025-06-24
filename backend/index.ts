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
app.get('/api/fonts', async (req: Request, res: Response) => {
  try {
    const fonts = await AppDataSource.manager.find(Font);
    res.json(fonts);
  } catch (error) {
    console.error('Error fetching fonts:', error);
    res.status(500).send('Server error');
  }
});

// Route to upload a font file
app.post('/api/fonts', upload.single('fontFile'), async (req, res) => {
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);
  try {
    if (!req.file) {
      res.status(400).send('No font file uploaded');
      return;
    }
    const { name } = req.body;
    if (!name) {
      res.status(400).send('Name is required');
      return;
    }
    const filePath = path.join('./fonts', req.file.filename);
    await fontService.saveFontToDB(name, filePath);
    console.log('Font saved successfully');
    res.status(201).json({ message: 'Font uploaded', filePath });
  } catch (error: any) {
    console.error('Error uploading font:', error);
    res.status(500).json({ message: 'Failed to upload font', error: error.message });
  }
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