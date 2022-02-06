import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Note } from '../../note';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addNoteToView = false;
  form: FormGroup | any;
  notes: Note[] | undefined;
  
  constructor(private apiService: ApiService, private router: Router) { }

  // Changes the state of the addNoteView variable
  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;
  
  // Changes the class name for the add note fields to bring it to view according to the value of the addNoteView variable 
  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm';
  
  // Changes the class name for the addNoteView fields to bring it to view according to the value of the addNoteView variable
  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  ngOnInit(): void {
    // Calls all notes and creates a basic form group for adding a new note
    this.getNotes();
    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      note_body:  new FormControl('<p>Enter Note Here</p>', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    });
  }

  getNotes() {
    // Calls the get all api service in order to get all notes within the database 
    this.apiService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
      console.log('Get All Called');
    })
  }

  async createNote() {
    // Creates a new note object and redirects the user to the note view route
    await this.apiService.create(this.form.value).subscribe(res => {
      console.log('Note Created Successfully!');
    });
    this.getNotes();
   
    this.router.navigateByUrl('/note', { state: { note: '', noteCreated: true }} );
  }

  deleteNote(id: any) {
    // Deletes a certain note from the database
    this.apiService.delete(id).subscribe(res => {
      this.notes = this.notes?.filter(item => item.id !== id);
      alert("Note Deleted Successfully!");
    })
  }

  clickNote(id: any) {
    // Gets the note that is beign clicekd onf rom the notes array and redirect the user to the main note router view with the current note as values for the editor 
    console.log(id);
    console.log(this.notes);
    let currentNote = this.notes?.filter( note => note.id === id);
    console.log(currentNote)
    this.router.navigateByUrl('/note',  { state: {note: currentNote, noteCreated: false}});
  }
}
