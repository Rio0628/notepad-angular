import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'notepad-angular';
  sidebarState = 'close';

  setSidebarState() {
    if (this.sidebarState === 'open') { this.sidebarState = 'close' }
    else this.sidebarState = 'open';
  };
}

