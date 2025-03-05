import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { Flashcard } from './entities/flashcard.entity';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel(Flashcard)
    private flashcardsRepository: typeof Flashcard,
  ) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    return this.flashcardsRepository.create({
      question: createFlashcardDto.question,
      answer: createFlashcardDto.answer,
    });
  }

  findAll() {
    return this.flashcardsRepository.findAll();
  }

  findOne(id: number) {
    return this.flashcardsRepository.findOne({ where: { id } });
  }

  update(id: number, updateFlashcardDto: UpdateFlashcardDto) {
    return this.flashcardsRepository.update(updateFlashcardDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.flashcardsRepository.destroy({
      where: { id },
    });
  }
}
