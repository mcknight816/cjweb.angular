import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from "../service/books.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  selectedBook :any;
  books = [];

  constructor(private bs:BooksService) { this.list(null);}
    ngOnInit() {
  }
  add(){
      this.selectedBook = {};
  }
  cancel(){
      this.selectedBook = null;
  }
  list(searchTerm){
      console.log(searchTerm);
     let query:any = {};
     if(searchTerm){

         let title_query = {};
         let author_query = {};
         let isbn_query = {};

         title_query['title'] = {'$regex': searchTerm + ".*", '$options' : 'i'};   //case insensitive title starts with
         author_query['author'] = {'$regex': searchTerm + ".*",'$options' : 'i'};  //case insensitive author starts with
         isbn_query['isbn'] = {'$regex': searchTerm + ".*"};                       //case sensitive isbn starts with

         query['$or'] = []; //or the queries
         query['$or'].push(title_query);
         query['$or'].push(author_query);
         query['$or'].push(isbn_query);
         //query['title'] =  { '$regex': this.searchText + ".*"};
     }
    this.bs.list(query).subscribe((data)=>{
            this.books = data.rows;
    });
  }
  onSelect(book){
    this.selectedBook = book;
  }

  save(){
    this.bs.save(this.selectedBook).subscribe((data)=>{
      this.selectedBook = null;
      this.list(null);
    });
  }

}
