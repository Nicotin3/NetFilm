import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Film } from './film';
import { films } from './mock-films';
@Injectable({ providedIn: 'root', })
export class DataService {

  constructor(private http: HttpClient) { }

  getUser(userId) {
    return this.http.get('http://jsonplaceholder.typicode.com/users/' + userId);
  }

  getFilms(page: number): Film[] {
    // return this.http.get('http://localhost/?page='+ page apikey=c4867038&t=Le+&y=2018');
    // getFilms() : Observable<Response> {
    return films;
  }
}
