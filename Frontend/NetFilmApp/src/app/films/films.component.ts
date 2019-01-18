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
  page: Number = 1;
  films$: Film[] ;
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
    this.films$ = this.data.getFilms(1);

   /* this
      .serv
      .getFilms()
      .subscribe((resp: Response) => {
        this.films$ = resp.json();
        this.totalRec = this.films$.length;
        console.log(this.totalRec);
        console.log(this.page);
      });
    */
  }

}
