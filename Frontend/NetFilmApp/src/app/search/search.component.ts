import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import {DataService} from '../data.service';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  title = new FormControl('');
  genre = new FormControl('');
  autor = new FormControl('');
  actor = new FormControl('');

  page: number = 0;
  films$: any[] ;
  totalRec: number = 10;

  constructor(private  data: DataService) { }

  ngOnInit() {
  }

  searchFilms(): void {
   // this.films$ = this.data.searchFilms(this.page, this.title.value, this.genre.value, this.autor.value, this.actor.value);
    const ttl: String = '' + this.title.value;
    const ge: String = '' + this.genre.value;
    const aut: String = '' + this.autor.value;
    const act: String = '' + this.actor.value;
    this
      .data
      .searchFilms(this.page, ttl, ge, aut, act)
      .subscribe((resp: any) => {
        this.films$ = resp.data;
        this.totalRec = resp.count;
        console.log(this.totalRec);
        console.log(this.page);
      });
  }


}
