import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();
  searchText:string;
  constructor() { }

  searchTermChanged() {
    this.searchTerm.emit(this.searchText);
  }

  ngOnInit() {
  }

}
