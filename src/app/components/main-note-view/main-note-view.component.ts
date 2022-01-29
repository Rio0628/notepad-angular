import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-main-note-view',
  templateUrl: './main-note-view.component.html',
  styleUrls: ['./main-note-view.component.css']
})
export class MainNoteViewComponent implements OnInit {

  editorForm!: FormGroup;

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

}
