import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable} from 'rxjs';
import {Film} from '../film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  page: Number = 0;
  films$: any[] ;
  totalRec: Number = 10;
  constructor( private  data: DataService) { }

  ngOnInit() {
  //  this.data.getFilms().subscribe(
  //  this.data.getFilms()(
  //  data => this.films$ = data
  //  );
    this.getFilms();
  }

  getFilms(): void {
   this
      .data
      .getFilms(this.page)
      .subscribe((resp: Object) => {
        this.films$ = resp.data;
        this.totalRec = resp.count;
        console.log(this.totalRec);
        console.log(this.page);
      });
  }
  testFilms(): void {
    // res = this.data.getFilms(1)
    // this.films$ = this.data.getFilms(1);
  }

}
