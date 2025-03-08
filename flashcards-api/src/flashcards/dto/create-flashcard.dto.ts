export enum Difficulty {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
}

export class CreateFlashcardDto {
  question: string;
  answer: string;
  difficulty: Difficulty;
}
