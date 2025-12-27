import { In } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Font } from '../entity/fonts';
import { Language } from '../entity/language';

export const saveFontToDB = async (name: string, filePath: string, langIds: number[],fontSize: number = 16): Promise<void> => {
  const font = new Font();
  font.name = name;
  font.filePath = filePath;
  font.fontSize = fontSize;
  const languages = await AppDataSource.manager.findBy(Language, { id: In(langIds) });
  font.languages = languages;

  await AppDataSource.manager.save(font);
  console.log(`Font ${name} saved with languages ${languages.map(l => l.name).join(', ')}`);
};

export const fontService = {
  saveFontToDB,
};