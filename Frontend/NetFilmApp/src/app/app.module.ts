import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FilmsComponent } from './films/films.component';
import { IgxNavbarModule, IgxIconModule} from 'igniteui-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FilmComponent } from './film/film.component';
import { AddComponent } from './add/add.component';
import {SingleMovieService} from './single-movie.service';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FilmsComponent,
    SearchComponent,
    FilmComponent,
    AddComponent
  ],
  imports: [
    BrowserModule, NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    IgxNavbarModule,
    IgxIconModule,
    ReactiveFormsModule
  ],
  providers: [DataService, SingleMovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
