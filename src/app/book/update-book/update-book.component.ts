import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Genre } from '../../genre/genre';
import { GenreService } from '../../genre/genre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent implements OnInit {
  id: number;
  book: Book = new Book();
  genres: Genre[];
  selectedGenre: number;
  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    const getBookById = async () => {
      await this.bookService.getBookById(this.id).then(
        (data) => {
          this.book = data.data;
          this.selectedGenre = this.book.genre.id;
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

  onSelectionChange() {
    console.log(
      '🚀 ~ UpdateBookComponent ~ onSelectionChange ~ event:',
      this.selectedGenre
    );
  }

  onSubmit() {
    const updateBook = async () => {
      let newGenre = this.genres.find(
        (genre) => genre.id === this.selectedGenre
      );
      this.book.genre = newGenre ? newGenre : this.book.genre;
      console.log('🚀 ~ UpdateBookComponent ~ updateBook ~ book:', this.book);
      await this.bookService.updateBook(this.id, this.book).then(
        (data) => {
          this.goToBookList();
        },
        (error) => console.log(error)
      );
    };
    updateBook();
  }

  goToBookList() {
    this.router.navigate(['/book-list']);
  }
}
