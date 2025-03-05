import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY } from 'rxjs';
import { Flashcard, FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-flashcards-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './flashcards-list.component.html',
  styleUrl: './flashcards-list.component.scss',
})
export class FlashcardsListComponent implements OnInit {
  flashcards = signal<Flashcard[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  visibleAnswers = signal<Record<number, boolean>>({});

  constructor(private flashcardsService: FlashcardsService) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.loading.set(true);
    this.flashcardsService
      .findAll()
      .pipe(
        catchError((err) => {
          this.error.set('Failed to load flashcards. Please try again later.');
          this.loading.set(false);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.flashcards.set(data);
        this.loading.set(false);

        // Initialize all answers as hidden
        const answerState: Record<number, boolean> = {};
        data.forEach((card) => {
          answerState[card.id] = false;
        });
        this.visibleAnswers.set(answerState);
      });
  }

  toggleAnswer(cardId: number): void {
    this.visibleAnswers.update((current) => ({
      ...current,
      [cardId]: !current[cardId],
    }));
  }

  isAnswerVisible(cardId: number): boolean {
    return this.visibleAnswers()[cardId] || false;
  }
}
