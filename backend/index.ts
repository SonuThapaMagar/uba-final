import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';

const app: Express = express();

// Enable CORS
app.use(cors());

//middleware to parse json
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || '3000');

app.get('/', (req: Request, res: Response) => {
    res.send('Type Tester Backend is running!');
})

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Initialize database connection with error handling
const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected!');
    } catch (err) {
        console.error('Database connection error:', err);
        console.log('Please make sure your database is running and environment variables are set correctly.');
        console.log('You can create a .env file with the following variables:');
        console.log('DB_HOST=localhost');
        console.log('DB_PORT=3306');
        console.log('DB_USER=root');
        console.log('DB_PASSWORD=your_password');
        console.log('DB_NAME=font_project');
    }
};

initializeDatabase();
