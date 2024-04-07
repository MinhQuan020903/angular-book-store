import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../utils/fetch';
import { Genre } from './genre';
import { Observable, Subscription, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private httpClient: HttpClient) {}

  getGenreList(): Promise<AxiosResponse<any, any>> {
    return getRequest({ endPoint: '/genres' });
  }
  getGenreById(id: number): Promise<AxiosResponse<any, any>> {
    return getRequest({ endPoint: `/genres/${id}` });
  }

  createGenre(genre: Genre): Observable<Genre> {
    return this.httpClient.post<Genre>(
      process.env['BACKEND_URL'] + '/genres',
      genre
    );
  }

  updateGenre(id: number, genre: Genre): Promise<AxiosResponse<any, any>> {
    return putRequest({
      endPoint: `/genres/${id}`,
      formData: genre,
      isFormData: false,
    });
  }

  deleteGenre(id: number): Promise<AxiosResponse<any, any>> {
    return deleteRequest({ endPoint: `/genres/${id}` });
  }
}
