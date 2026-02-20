import { DataSource } from 'typeorm'
import Font from '../entity/fonts'
import Language from '../entity/language';

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'font',
    synchronize: false,
    logging: false,
    entities: [Font,Language],
    migrations: ['../migrations/*.ts'],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
