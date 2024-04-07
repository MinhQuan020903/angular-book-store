import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Genre } from '../genre';
import { GenreService } from '../genre.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css',
})
export class CreateGenreComponent implements OnInit {
  genre: Genre = new Genre();
  constructor(
    private genreService: GenreService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  async saveGenre() {
    this.genreService
      .createGenre(this.genre)
      .pipe(
        tap((data) => {
          console.log(data);
          this.goToBookList();
        }),
        catchError((error) => {
          if (error.status === 400) {
            this.toastr.error('Error! Genre already exist!', 'Error');
          }

          return throwError(error);
        })
      )
      .subscribe();
  }

  goToBookList() {
    this.router.navigate(['/genre-list']);
  }

  async onSubmit() {
    await this.saveGenre();
  }
}
