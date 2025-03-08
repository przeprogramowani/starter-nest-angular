import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FlashcardsService } from '../flashcards.service';
import { Difficulty } from '../flashcards.types';

@Component({
  selector: 'app-flashcards-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './flashcards-create.component.html',
  styleUrl: './flashcards-create.component.scss',
})
export class FlashcardsCreateComponent {
  flashcardForm: FormGroup;
  submitting = signal(false);
  error = signal<string | null>(null);
  difficulties = Object.values(Difficulty);

  constructor(
    private fb: FormBuilder,
    private flashcardsService: FlashcardsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.flashcardForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      difficulty: ['easy', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.flashcardForm.valid) {
      this.submitting.set(true);
      this.error.set(null);

      this.flashcardsService.create(this.flashcardForm.value).subscribe({
        next: () => {
          this.snackBar.open('Flashcard created successfully!', 'Close', {
            duration: 3000,
          });
          this.flashcardForm.reset();
          this.submitting.set(false);
          this.router.navigate(['/']); // Navigate back to the list
        },
        error: (err) => {
          console.error('Error creating flashcard:', err);
          this.error.set('Failed to create flashcard. Please try again.');
          this.submitting.set(false);
          this.snackBar.open('Error creating flashcard', 'Close', {
            duration: 5000,
          });
        },
      });
    }
  }
}
