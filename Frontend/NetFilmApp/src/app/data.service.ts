import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root', })
export class DataService {

  constructor(private http: HttpClient) { }

  getFilms(page: number): Observable<Object> {
    return this.http.get('http://localhost:5000/?page=' + page );
  }

  searchFilms(page: number, title: String, genre: String, autor: String, actor: String): Observable<Object> {
    return this.http.get('http://localhost:5000/search?page=' + page + '&title=' + title + '&genre=' + genre +
      '&autor=' + autor + '&actor=' + actor );
  }

  addFilms(film): void {
    // return this.http.get('http://localhost/?page='+ page apikey=c4867038&t=Le+&y=2018');
    // getFilms() : Observable<Response> {
    return this.http.post('http://localhost:5000/addfilm' );
  }
}
