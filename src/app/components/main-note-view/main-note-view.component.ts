import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Note } from '../../note';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-main-note-view',
  templateUrl: './main-note-view.component.html',
  styleUrls: ['./main-note-view.component.css']
})
export class MainNoteViewComponent implements OnInit {

  editorForm!: FormGroup;
  noteID: '' | undefined;
  
  constructor(private apiService: ApiService ,private router: Router) {}

  ngOnInit() {
    this.editorForm = new FormGroup({
      'name':  new FormControl(history.state.note[0].name, [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      'note_body': new FormControl(history.state.note[0].note_body)
    });

    this.noteID = history.state.note[0].id;

    console.log(history.state);
  }
  
  returnToDash() {
    // Save code
    this.router.navigate(['']);
  }

  updateNoteLeave() {
    console.log(this.editorForm.value);
    this.apiService.update(this.noteID, this.editorForm.value).subscribe(res => {
      console.log('Note updated Successfully!');
      this.router.navigateByUrl('');
    })
  }

  updateNote() {
    console.log(this.editorForm.value);
    this.apiService.update(this.noteID, this.editorForm.value).subscribe(res => {
      console.log('Note Updated SuccessFully!');
    })
  }
}
