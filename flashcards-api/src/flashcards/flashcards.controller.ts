import { Controller, Get } from '@nestjs/common';
import { OpenRouterService } from '../openrouter/openrouter.service';
import { FlashcardsService } from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(
    private openRouterService: OpenRouterService,
    private flashcardsService: FlashcardsService,
  ) {}

  @Get()
  async getFlashcards() {
    try {
      const flashcards = await this.openRouterService.chatCompletionAsync(
        'gpt-3.5-turbo',
        [{ role: 'user', content: 'Q: What is the capital of Poland?' }],
      );
      return flashcards;
    } catch (error) {
      throw new Error('Error retrieving flashcards: ' + error);
    }
  }
}
