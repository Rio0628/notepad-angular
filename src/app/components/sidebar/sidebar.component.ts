import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Note } from '../../note';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarOpen = '';
  addNoteToView = false;
  form: FormGroup | any;
  notes: Note[] | undefined;

  constructor(private apiService: ApiService, private router: Router) {}

  // Changes the state of the addNoteView variable 
  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;

  // Changes the class name for the add note fields to bring it to view according to the value of the addNoteView variable
  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm';

  // Changes the class name for the addNoteView fields to bring it to view according to the value of the addNoteView variable
  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  // Changes the class name for the sidebar in order to bring it to view and out of view
  sidebarStatus = () => this.sidebarOpen === 'open' ? "sidenavCntr active" : 'sidenavCntr';

  ngOnInit(): void {
    // Get all function from apiService to retrieve all notes from database
    this.apiService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
    })

    // Form Group for the note that will be created 
    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      note_body:  new FormControl('<p>Enter Note Here</p>', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    });
  }

  createNote() {
    // Creates a new note object, inserts it to the database, and calls the main note route view
    console.log(this.form.value);
    this.apiService.create(this.form.value).subscribe(res => {
      console.log('Note Created Successfully!');
      this.sidebarOpen = 'close';
      this.router.navigateByUrl('/note', {state: { note: this.form.value, noteCreated: true }});
    })
  }

  clickNote(id: any) {
    // Gets the note that is being clicked on from the notes array and redirect the user to the main note router view with the current note as values for the editor
    console.log(id);
    console.log(this.notes);
    let currentNote = this.notes?.filter( note => note.id === id);
    console.log(currentNote)
    this.router.navigateByUrl('/note',  { state: {note: currentNote, noteCreated: false}} );
    this.sidebarOpen = "close";
  }

  // Deletes a certain note from the database
  deleteNote(id: any) {
    this.apiService.delete(id).subscribe(res => {
      this.notes = this.notes?.filter(item => item.id !== id);
      alert("Note Deleted Successfully!");
    })
    this.router.navigateByUrl('');
  }
}

