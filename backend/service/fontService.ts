import { AppDataSource } from '../config/database';
import { Font } from '../entity/fonts';

export const saveFontToDB = async (name: string, filePath: string): Promise<void> => {
  const font = new Font();
  font.name = name;
  font.filePath = filePath;
  try {
    await AppDataSource.manager.save(font);
    console.log(`Font ${name} saved to database with path ${filePath}`);
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
};

export const fontService = {
  saveFontToDB,
};