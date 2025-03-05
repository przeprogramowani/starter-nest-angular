import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'flashcards', timestamps: false })
export class Flashcard extends Model {
  @Column
  question: string;

  @Column
  answer: string;
}
