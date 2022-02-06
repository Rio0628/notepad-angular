import { Component } from '@angular/core';
import { OnInit, EventEmitter } from '@angular/core';
import { SearchbarService } from './services/searchbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'notepad-angular';
  sidebarState = 'close';

  constructor (private searchbarService: SearchbarService) { }

  // notes = ApiService.readNotes();

  searchbarFunc(e: any) {
    this.searchbarService.updateSearchValue(e.target.value);
    // this.searchValues = e.target.value;
  }

  setSidebarState = () => this.sidebarState === 'open' ? this.sidebarState = 'close' : this.sidebarState = 'open';

  ngOnInit() : void {
    // console.log(this.searchbar);
  }



}

// console.log(title);