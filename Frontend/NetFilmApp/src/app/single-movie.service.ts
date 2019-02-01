import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class SingleMovieService {

  constructor(private http: HttpClient) { }


  getFilm(id: String): Observable<any> {
    // getFilms() : Observable<Response> {
    return this.http.get('http://projetdlc.istic.univ-rennes1.fr:5000/film?id=' + id);
    // return films[1];
  }
  addFilms(film): Observable<Object> {
    // return this.http.get('http://localhost/?page='+ page apikey=c4867038&t=Le+&y=2018');
    // getFilms() : Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Object>('http://projetdlc.istic.univ-rennes1.fr:5000/addfilm', film, httpOptions );
  }
}
