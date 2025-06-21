import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './config/database';

const app: Express = express();

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


AppDataSource.initialize()
    .then(() => {
        console.log('Database connected!');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
