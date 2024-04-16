import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GenreService } from '../../genre/genre.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Genre } from '../../genre/genre';
import { catchError, tap, throwError } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastModule,
  ],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css',
})
export class CreateBookComponent implements OnInit {
  book: Book = new Book();
  genres: Genre[];
  selectedGenre: number;
  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const getGenres = async () => {
      await this.genreService.getGenreList().then(
        (data) => {
          this.genres = data.data;
          console.log(
            '🚀 ~ BookDetailsComponent ~ getGenres ~ genres:',
            this.genres
          );
        },
        (error) => console.log(error)
      );
    };
    getGenres();
  }

  async saveBook() {
    let newGenre = this.genres.find((genre) => genre.id === this.selectedGenre);
    this.book.genre = newGenre ? newGenre : this.book.genre;
    console.log('🚀 ~ CreateBookComponent ~ saveBook ~ book:', this.book);

    this.bookService
      .createBook(this.book)
      .pipe(
        tap((data) => {
          this.toastr.success('Add book successfully!', 'Success');
          this.goToBookList();
        }),
        catchError((error) => {
          this.toastr.error('Error! Book already exists!', 'Error');
          return throwError(error);
        })
      )
      .subscribe();
  }

  goToBookList() {
    this.router.navigate(['/book-list']);
  }

  async onSubmit() {
    await this.saveBook();
  }
}
