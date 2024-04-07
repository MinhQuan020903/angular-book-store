import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Genre } from '../../genre/genre';
import { GenreService } from '../../genre/genre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  id: number;
  book: Book;
  genres: Genre[];
  selectedGenre: Genre;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.book = new Book();
    const getBookById = async () => {
      await this.bookService.getBookById(this.id).then(
        (data) => {
          this.book = data.data;
          console.log(
            '🚀 ~ BookDetailsComponent ~ getBookById ~ book:',
            this.book
          );
          this.selectedGenre = this.book.genre;
          console.log(
            '🚀 ~ BookDetailsComponent ~ getBookById ~ selectedGenre:',
            this.selectedGenre
          );
        },
        (error) => console.log(error)
      );
    };
    getBookById();

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
}
