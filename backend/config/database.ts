import { DataSource } from 'typeorm'
import { Font } from '../entity/fonts';

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'font_project',
    synchronize: true,
    logging: false,
    entities: [Font],
    migrations: [],
    subscribers: [],
})