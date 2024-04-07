import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export default class BookListComponent implements OnInit {
  bookList: Book[];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getBookList();
  }

  private async getBookList() {
    await this.bookService
      .getBookList()
      .then((res) => {
        console.log('🚀 ~ BookListComponent ~ res:', res);
        this.bookList = res.data;
        this.bookList.sort((a, b) => a.id - b.id);
      })
      .catch((error) => {
        console.error('Error fetching book list:', error);
        // Handle error here if needed
      });
  }

  createBook() {
    this.router.navigate(['create-book']);
  }

  bookDetail(id: number) {
    this.router.navigate(['book-details', id]);
  }

  updateBook(id: number) {
    this.router.navigate(['update-book', id]);
  }

  async deleteBook(id: number) {
    await this.bookService.deleteBook(id).then((data) => {
      console.log(data);
      this.getBookList();
    });
  }
}
