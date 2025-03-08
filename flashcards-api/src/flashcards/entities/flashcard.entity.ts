import { Column, Model, Table } from 'sequelize-typescript';
import { Difficulty } from '../dto/create-flashcard.dto';

@Table({ tableName: 'flashcards', timestamps: false })
export class Flashcard extends Model {
  @Column
  question: string;

  @Column
  answer: string;

  @Column
  difficulty: Difficulty;
}
