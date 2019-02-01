import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SingleMovieService} from '../single-movie.service';
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  film: any;

  constructor( private  data: SingleMovieService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.getFilm();
  }
  getFilm() {
    const id = this.route.snapshot.paramMap.get('id');
    // this.film = this.data.getFilm(id);
    // console.log(this.film);
    this
      .data
      .getFilm(id)
      .subscribe((resp: Response) => {
        this.film = resp[0];
      });
  }
}
