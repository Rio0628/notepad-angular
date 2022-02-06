import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SearchbarService } from '../../services/searchbar.service';
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
  
  constructor(private apiService: ApiService, private searchbarService: SearchbarService, private router: Router) { }

  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;
  
  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm'; 
  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  ngOnInit(): void {
    this.getNotes();
    this.getSearchValue();
    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      note_body:  new FormControl('<p>Enter Note Here</p>', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    });
  }
  
  getSearchValue () {
    const searchValue = this.searchbarService.getSearchValue();
    console.log(searchValue);
  }
  

  getNotes() {
    this.apiService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
      console.log('Get All Called');
    })
  }

  async createNote() {
    // console.log(this.form.value);
    await this.apiService.create(this.form.value).subscribe(res => {
      console.log('Note Created Successfully!');
    });
    this.getNotes();
    // const notes = this.notes;
    // console.log(notes?.pop());
   
    this.router.navigateByUrl('/note', { state: { note: '', noteCreated: true }} );
  }

  deleteNote(id: any) {
    this.apiService.delete(id).subscribe(res => {
      this.notes = this.notes?.filter(item => item.id !== id);
      console.log("Note Deleted Successfully!");
    })
  }

  test(id: any) {
    console.log(id)
    this.router.navigate(['/']);
  }

  clickNote(id: any) {
    console.log(id);
    console.log(this.notes);
    let currentNote = this.notes?.filter( note => note.id === id);
    console.log(currentNote)
    this.router.navigateByUrl('/note',  { state: {note: currentNote, noteCreated: false}});
  }
}
