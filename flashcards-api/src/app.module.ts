import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataBaseConfig } from './db/database.config';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { OpenRouterModule } from './openrouter/openrouter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(dataBaseConfig),
    FlashcardsModule,
    OpenRouterModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
