import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() searchChanged = new EventEmitter<string>();
  searchTerm:string;
  searchTermChanged: Subject<string> = new Subject<string>();

  constructor() {
    this.searchTermChanged.pipe(
        debounceTime(1000),
        distinctUntilChanged()
    ).subscribe(searchTerm => {
        if(searchTerm.length > 2 || searchTerm.length < 1){
            this.searchTerm = searchTerm;
            this.search();
        }
    });
  }

  onSearchTermChange(){
    this.searchTermChanged.next(this.searchTerm);
  }

  search(){
    this.searchChanged.emit(this.searchTerm);
  }

  ngOnInit() {
  }

}
