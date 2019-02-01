import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) { }

  getFilms(page: Number): Observable<Object> {
    return this.http.get('http://localhost:5000/?page=' + page );
  }

  searchFilms(page: Number, title: String, genre: String, autor: String, actor: String): Observable<Object> {
    return this.http.get('http://localhost:5000/search?page=' + page + '&title=' + title + '&genre=' + genre +
      '&autor=' + autor + '&actor=' + actor );
  }

}
