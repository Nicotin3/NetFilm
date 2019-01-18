import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmsComponent} from './films/films.component';

const routes: Routes = [
  {
    path : '',
    component : FilmsComponent
  },
  {
    path : 'films',
    component : FilmsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
