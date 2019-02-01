import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {SearchComponent} from './search/search.component';
import {FilmComponent} from './film/film.component';
import {AddComponent} from './add/add.component';

const routes: Routes = [
  {
    path : '',
    component : SearchComponent
  },
  {
    path : 'add',
    component : AddComponent
  },
  {
    path : 'film/:id',
    component : FilmComponent
  },
  {
    path : 'films',
    component : FilmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
