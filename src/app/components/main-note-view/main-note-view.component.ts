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

  editorForm: FormGroup | any;
  noteID: '' | undefined;
  notes: Note[] | undefined;
  notesSearched: false | any;
  currentNote: '' | any;

  constructor(private apiService: ApiService ,private router: Router) {}

  async ngOnInit() {
    
    this.editorForm = new FormGroup({
      'name':  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      'note_body': new FormControl('')
    });  

    // console.log(history.state)
    if (history.state.noteCreated) {
      await this.apiService.getAll().subscribe((notes: Note[]) => {
        this.notes = notes;
        this.notesSearched = true;
        console.log(this.notes);
        this.currentNote = notes?.slice(-1);
        console.log(this.currentNote);

        this.editorForm.controls['name'].setValue(this.currentNote[0].name);
        this.editorForm.controls['note_body'].setValue(this.currentNote[0].note_body);
        this.noteID = this.currentNote[0].id;
      })
      // console.log(this.notes);
    }
    else {
      this.editorForm.controls['name'].setValue(history.state.note[0].name);
      this.editorForm.controls['note_body'].setValue(history.state.note[0].note_body);

      this.noteID = history.state.note[0].id;
    }
    
    console.log(this.editorForm);
    // console.log(history.state);
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
