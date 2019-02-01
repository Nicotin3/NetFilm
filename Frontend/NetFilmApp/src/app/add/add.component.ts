import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DataService} from '../data.service';
import {Rating} from '../film';
import {SingleMovieService} from '../single-movie.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  title = new FormControl('', [Validators.required ]);
  genre = new FormControl('');
  autor = new FormControl('');
  actor = new FormControl('');

  Year = new FormControl('');
  Rated  = new FormControl('');
  Released = new FormControl('');
  Runtime = new FormControl('');

  Director = new FormControl('');
  Writer = new FormControl('');
  Plot = new FormControl('');
  Language = new FormControl('');

  Country = new FormControl('');
  Awards = new FormControl('');
  Poster = new FormControl('');

  imdbRating = new FormControl('');
  imdbVotes = new FormControl('');
  imdbID = new FormControl('');

  Type = new FormControl('');
  DVD = new FormControl('');
  BoxOffice = new FormControl('');
  totalSeasons = new FormControl('');

  Production = new FormControl('');
  Website = new FormControl('');
  Response = new FormControl('');
  Metascore = new FormControl('');


  constructor(private  data: SingleMovieService) { }

  ngOnInit() {
  }
  addFilms(): void {
    const newFilm = {'Title': this.title.value, 'Year': this.Year.value, 'Rated': this.Rated.value, 'Released': this.Released.value,
      'Runtime': this.Runtime.value, 'Genre': this.genre.value, 'Director': this.Director.value, 'Writer': this.Writer.value,
      'Actors': this.actor.value, 'Plot': this.Plot.value, 'Language': this.Language.value, 'Country': this.Country.value,
      'Awards': this.Awards.value, 'Poster': this.Poster.value, 'Metascore': this.Metascore.value, 'imdbRating': this.imdbRating.value,
      'imdbVotes': this.imdbVotes.value, 'imdbID': this.imdbID.value, 'Type': this.Type.value, 'DVD': this.DVD.value,
      'BoxOffice': this.BoxOffice.value, 'Production': this.Production.value, 'Website': this.Website.value,
      'Response': this.Response.value};
    console.log(newFilm);
    this.data.addFilms(newFilm);
  }

}
