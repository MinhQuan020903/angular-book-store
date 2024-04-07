import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Genre } from '../genre';
import { GenreService } from '../genre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css',
})
export default class GenreListComponent implements OnInit {
  genreList: Genre[];

  constructor(private genreService: GenreService, private router: Router) {}

  ngOnInit(): void {
    this.getGenreList();
  }

  createGenre() {
    this.router.navigate(['create-genre']);
  }

  deleteGenre(id: number) {
    this.genreService.deleteGenre(id).then(() => {
      this.getGenreList();
    });
  }

  private async getGenreList() {
    await this.genreService
      .getGenreList()
      .then((res) => {
        console.log('🚀 ~ GenreListComponent ~ .then ~ res:', res);
        this.genreList = res.data;
      })
      .catch((error) => {
        console.error('Error fetching genre list:', error);
        // Handle error here if needed
      });
  }
}
