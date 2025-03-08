export enum Difficulty {
  EASY = 'easy',
  NORMAL = 'normal ',
  HARD = 'hard',
}

export interface CreateFlashcardDto {
  question: string;
  answer: string;
  difficulty: Difficulty;
}

export interface Flashcard extends CreateFlashcardDto {
  id: number;
}

export interface FlashcardGroup {
  difficulty: Difficulty;
  cards: Flashcard[];
}
