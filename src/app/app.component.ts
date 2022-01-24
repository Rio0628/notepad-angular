import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'notepad-angular';

  test() {
    console.log('mario');
  }
}

console.log('mariop')
