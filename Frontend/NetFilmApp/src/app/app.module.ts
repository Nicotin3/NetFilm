import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FilmsComponent } from './films/films.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { IgxNavbarModule, IgxIconModule} from 'igniteui-angular';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FilmsComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule, NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    IgxNavbarModule,
    IgxIconModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
