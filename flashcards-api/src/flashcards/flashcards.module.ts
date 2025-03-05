import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Flashcard } from './entities/flashcard.entity';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';

@Module({
  imports: [SequelizeModule.forFeature([Flashcard])],
  controllers: [FlashcardsController],
  providers: [FlashcardsService],
})
export class FlashcardsModule {}
