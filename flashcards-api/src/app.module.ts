import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { OpenRouterModule } from './openrouter/openrouter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FlashcardsModule,
    OpenRouterModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
