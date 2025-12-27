"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontService = exports.saveFontToDB = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../config/database");
const fonts_1 = require("../entity/fonts");
const language_1 = require("../entity/language");
const saveFontToDB = async (name, filePath, langIds, fontSize = 16) => {
    const font = new fonts_1.Font();
    font.name = name;
    font.filePath = filePath;
    font.fontSize = fontSize;
    const languages = await database_1.AppDataSource.manager.findBy(language_1.Language, { id: (0, typeorm_1.In)(langIds) });
    font.languages = languages;
    await database_1.AppDataSource.manager.save(font);
    console.log(`Font ${name} saved with languages ${languages.map(l => l.name).join(', ')}`);
};
exports.saveFontToDB = saveFontToDB;
exports.fontService = {
    saveFontToDB: exports.saveFontToDB,
};
