import { Routes } from '@angular/router';
import { FlashcardsCreateComponent } from './flashcards-create/flashcards-create.component';
import { FlashcardsListComponent } from './flashcards-list/flashcards-list.component';

export const routes: Routes = [
  {
    path: '',
    component: FlashcardsListComponent,
  },
  {
    path: 'create',
    component: FlashcardsCreateComponent,
  },
];
