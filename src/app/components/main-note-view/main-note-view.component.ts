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
    // Basic form for name and editor 
    this.editorForm = new FormGroup({
      'name':  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      'note_body': new FormControl('')
    });  

    // Conditional that populates form fields according to if the note object is created or just clicked on
    if (history.state.noteCreated) {
      // Calls the get all api service and gets the last note (last one created) and populates the forms field with it 
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
    }
    else {
      // Populdates the form fields from the note object that is within state 
      this.editorForm.controls['name'].setValue(history.state.note[0].name);
      this.editorForm.controls['note_body'].setValue(history.state.note[0].note_body);

      this.noteID = history.state.note[0].id;
    }
  }

  updateNoteLeave() {
    // Updates a note using the ID provided with the values of the form | Takes the user back to the dahsboard router view
    console.log(this.editorForm.value);
    this.apiService.update(this.noteID, this.editorForm.value).subscribe(res => {
      console.log('Note updated Successfully!');
      this.router.navigateByUrl('');
    })
  }

  updateNote() {
    // Updates a notes using the ID provided with the values of the form 
    console.log(this.editorForm.value);
    this.apiService.update(this.noteID, this.editorForm.value).subscribe(res => {
      console.log('Note Updated SuccessFully!');
    })
  }

  deleteNote() {
    // Deletes a certain note from the database
    this.apiService.delete(this.noteID).subscribe( res => {
      alert('Note Deleted Successfully!');
      this.router.navigateByUrl('');
    })
  }
}
