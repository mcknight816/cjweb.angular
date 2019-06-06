import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BookListComponent } from './book-list/book-list.component';
import { HttpClientModule} from "@angular/common/http";
import { BookDetailComponent } from './book-detail/book-detail.component';

import { HomeComponent } from './home/home.component';
import { SearchBoxComponent } from './search-box/search-box.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'book', component: BookListComponent },
      { path: 'book/edit', component: BookDetailComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BookListComponent,
    BookDetailComponent,
    HomeComponent,
    SearchBoxComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
