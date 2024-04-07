import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Book } from './book';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../utils/fetch';
import { Axios, AxiosResponse } from 'axios';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBookList(): Promise<AxiosResponse<any, any>> {
    return getRequest({ endPoint: '/books' });
  }
  getBookById(id: number): Promise<AxiosResponse<any, any>> {
    return getRequest({ endPoint: `/books/${id}` });
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(
      process.env['BACKEND_URL'] + '/books',
      book
    );
  }

  updateBook(id: number, book: Book): Promise<AxiosResponse<any, any>> {
    return putRequest({
      endPoint: `/books/${id}`,
      formData: book,
      isFormData: false,
    });
  }

  deleteBook(id: number): Promise<AxiosResponse<any, any>> {
    return deleteRequest({ endPoint: `/books/${id}` });
  }
}
