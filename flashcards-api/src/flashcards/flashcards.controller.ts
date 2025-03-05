import { Controller, Get } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private flashcardsService: FlashcardsService) {}

  @Get()
  getFlashcards() {
    return this.flashcardsService.getFlashcards();
  }
}
