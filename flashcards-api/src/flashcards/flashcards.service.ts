import { Injectable } from '@nestjs/common';

@Injectable()
export class FlashcardsService {
  private flashcards = [
    {
      id: 1,
      title: 'Flashcard 1',
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Flashcard 2',
      description: 'Description 2',
    },
  ];

  getFlashcards() {
    return this.flashcards;
  }
}
