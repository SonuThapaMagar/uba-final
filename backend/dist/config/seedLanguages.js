"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const language_1 = require("../entity/language");
async function seedLanguages() {
    await database_1.AppDataSource.initialize();
    const repo = database_1.AppDataSource.getRepository(language_1.Language);
    await repo.save([
        { name: 'English', code: 'en' },
        { name: 'Nepali', code: 'ne' },
        { name: 'Chinese', code: 'zh' }
    ]);
    console.log('Languages seeded!');
    process.exit();
}
seedLanguages();
