import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE_PATH || 'src/db/flashcards.db',
  autoLoadModels: true,
  synchronize: false,
};
