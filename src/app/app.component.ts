import { Component } from '@angular/core';
import { OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'notepad-angular';
  sidebarState = 'close';

  constructor () { }
 
  // Change the value of the sidebarState var to bring the sidebar to view and out of view 
  setSidebarState = () => this.sidebarState === 'open' ? this.sidebarState = 'close' : this.sidebarState = 'open';

  ngOnInit() : void {
  }



}