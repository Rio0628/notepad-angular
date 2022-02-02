import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Note } from './note';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'notepad-angular';
  sidebarState = 'close';
  notes : Note[] | undefined;

  constructor (private apiService : ApiService) {
    this.apiService.readNotes().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
    })
  }

  // notes = ApiService.readNotes();

  setSidebarState = () => this.sidebarState === 'open' ? this.sidebarState = 'close' : this.sidebarState = 'open';

  ngOnInit() : void {}
}

// console.log(title);