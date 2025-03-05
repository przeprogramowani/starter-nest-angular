import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: 'src/db/flashcards.db',
  autoLoadModels: true,
  synchronize: false,
};
