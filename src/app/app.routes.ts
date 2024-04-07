import { Routes } from '@angular/router';
import BookListComponent from './book/book-list/book-list.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { CreateGenreComponent } from './genre/create-genre/create-genre.component';
import { UpdateGenreComponent } from './genre/update-genre/update-genre.component';
import GenreListComponent from './genre/genre-list/genre-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'book-list', pathMatch: 'full' },
  { path: 'book-list', component: BookListComponent },
  { path: 'create-book', component: CreateBookComponent },
  { path: 'update-book/:id', component: UpdateBookComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'create-genre', component: CreateGenreComponent },
  { path: 'update-genre/:id', component: UpdateGenreComponent },
  { path: 'genre-list', component: GenreListComponent },
];
