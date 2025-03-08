import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY } from 'rxjs';
import { FlashcardsService } from '../flashcards.service';
import { Difficulty, Flashcard, FlashcardGroup } from '../flashcards.types';

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
    MatIconModule,
  ],
  templateUrl: './flashcards-list.component.html',
  styleUrl: './flashcards-list.component.scss',
})
export class FlashcardsListComponent implements OnInit {
  flashcards = signal<Flashcard[]>([]);
  groupedFlashcards = signal<FlashcardGroup[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  visibleAnswers = signal<Record<number, boolean>>({});

  constructor(private flashcardsService: FlashcardsService) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  private groupFlashcards(cards: Flashcard[]): FlashcardGroup[] {
    const groups: Record<Difficulty, Flashcard[]> = {
      [Difficulty.EASY]: [],
      [Difficulty.NORMAL]: [],
      [Difficulty.HARD]: [],
    };

    cards.forEach((card) => {
      groups[card.difficulty]?.push(card);
    });

    return Object.entries(groups).map(([difficulty, cards]) => ({
      difficulty: difficulty as Difficulty,
      cards,
    }));
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
        this.groupedFlashcards.set(this.groupFlashcards(data));
        this.loading.set(false);

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

  deleteFlashcard(event: Event, cardId: number): void {
    event.stopPropagation();

    if (confirm('Are you sure you want to delete this flashcard?')) {
      this.loading.set(true);
      this.flashcardsService
        .remove(cardId)
        .pipe(
          catchError((err) => {
            this.error.set(
              'Failed to delete flashcard. Please try again later.'
            );
            this.loading.set(false);
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.flashcards.update((cards) =>
            cards.filter((card) => card.id !== cardId)
          );
          this.groupedFlashcards.set(this.groupFlashcards(this.flashcards()));
          this.loading.set(false);
        });
    }
  }
}
