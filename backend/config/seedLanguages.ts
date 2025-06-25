import { AppDataSource } from './database';
import { Language } from '../entity/language';

async function seedLanguages() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Language);
  await repo.save([
    { name: 'English', code: 'en' },
    { name: 'Nepali', code: 'ne' },
    { name: 'Chinese', code: 'zh' }
  ]);
  console.log('Languages seeded!');
  process.exit();
}

seedLanguages();
