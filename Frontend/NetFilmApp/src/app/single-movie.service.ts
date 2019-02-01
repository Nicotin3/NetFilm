import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class SingleMovieService {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }


  getFilm(id: String): Observable<any> {
    // getFilms() : Observable<Response> {
    return this.http.get('http://localhost:5000/film?id=' + id);
    // return films[1];
  }
  addFilms(film): Observable<> {
    // return this.http.get('http://localhost/?page='+ page apikey=c4867038&t=Le+&y=2018');
    // getFilms() : Observable<Response> {
    return this.http.post<Object>('http://localhost:5000/addfilm', film, this.httpOptions );
  }
}
