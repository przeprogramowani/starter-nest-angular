import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFlashcardDto, Difficulty } from './dto/create-flashcard.dto';
import { Flashcard } from './entities/flashcard.entity';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel(Flashcard)
    private flashcardsRepository: typeof Flashcard,
  ) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    // Map the incoming DTO to ensure we're using the API's Difficulty enum
    const mappedDto = {
      question: createFlashcardDto.question,
      answer: createFlashcardDto.answer,
      difficulty: this.mapDifficulty(createFlashcardDto.difficulty),
    };

    return this.flashcardsRepository.create(mappedDto);
  }

  private mapDifficulty(difficulty: any): Difficulty {
    switch (difficulty) {
      case 'easy':
        return Difficulty.EASY;
      case 'normal':
        return Difficulty.NORMAL;
      case 'hard':
        return Difficulty.HARD;
      default:
        return Difficulty.NORMAL;
    }
  }

  findAll() {
    return this.flashcardsRepository.findAll();
  }

  findOne(id: number) {
    return this.flashcardsRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.flashcardsRepository.destroy({
      where: { id },
    });
  }
}
