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

  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;

  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm';

  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  sidebarStatus = () => this.sidebarOpen === 'open' ? "sidenavCntr active" : 'sidenavCntr';

  ngOnInit(): void {
    this.apiService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
    })

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      note_body:  new FormControl('<p>Enter Note Here</p>', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    });
  }

  createNote() {
    console.log(this.form.value);
    this.apiService.create(this.form.value).subscribe(res => {
      console.log('Note Created Successfully!');
      this.router.navigateByUrl('/note', {state: { note: this.form.value}});
    })
  }

  clickNote(id: any) {
    console.log(id);
    console.log(this.notes);
    let currentNote = this.notes?.filter( note => note.id === id);
    console.log(currentNote)
    this.router.navigateByUrl('/note',  { state: {note: currentNote}} );
    this.sidebarOpen = "close";
  }

  deleteNote(id: any) {
    this.apiService.delete(id).subscribe(res => {
      this.notes = this.notes?.filter(item => item.id !== id);
      console.log("Note Deleted Successfully!");
    })
    this.router.navigateByUrl('');
  }
}

