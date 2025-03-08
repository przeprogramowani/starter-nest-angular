import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateFlashcardDto, Flashcard } from './flashcards.types';

@Injectable({
  providedIn: 'root',
})
export class FlashcardsService {
  private readonly apiUrl = 'http://localhost:3000/flashcards';

  constructor(private readonly http: HttpClient) {}

  /**
   * Create a new flashcard
   * @param createFlashcardDto The flashcard data to create
   * @returns An observable with the created flashcard
   */
  create(createFlashcardDto: CreateFlashcardDto): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.apiUrl, createFlashcardDto);
  }

  /**
   * Get all flashcards
   * @returns An observable with an array of all flashcards
   */
  findAll(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl);
  }

  /**
   * Get a specific flashcard by ID
   * @param id The ID of the flashcard to retrieve
   * @returns An observable with the requested flashcard
   */
  findOne(id: number): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.apiUrl}/${id}`);
  }

  /**
   * Delete a flashcard
   * @param id The ID of the flashcard to delete
   * @returns An observable with the operation result
   */
  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
