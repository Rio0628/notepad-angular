import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-main-note-view',
  templateUrl: './main-note-view.component.html',
  styleUrls: ['./main-note-view.component.css']
})
export class MainNoteViewComponent implements OnInit {

  editorForm!: FormGroup;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }
  
  returnToDash() {
    // Save code
    this.router.navigate(['']);
  }
}
