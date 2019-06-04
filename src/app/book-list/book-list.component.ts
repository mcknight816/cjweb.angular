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
  constructor(private bs:BooksService) { this.list();}
  ngOnInit() {
  }

  list(){
    this.bs.list().subscribe((data)=>{
            this.books = data.rows;
    });
  }
  onSelect(book){
    this.selectedBook = book;
  }

  save(){
    this.bs.save(this.selectedBook).subscribe((data)=>{
      this.selectedBook = null;
    });
  }

}
