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

  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;
  
  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm'; 
  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  ngOnInit(): void {
    this.apiService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      note_body:  new FormControl('<p>Enter Note Here</p>', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    });
  }

  createNote() {
    console.log(this.form.value);
    this.apiService.create(this.form.value).subscribe(res => {
      console.log('Person Created Successfully!');
      // this.router.navigate(['/note']);
    });
  }

  deleteNote(id: any) {
    this.apiService.delete(id).subscribe(res => {
      this.notes = this.notes?.filter(item => item.id !== id);
      console.log("Person Deleted Successfully!");
    })
  }

  test(id: any) {
    console.log(id)
    this.router.navigate(['/']);
  }

  test2() {
    console.log('mario')
    this.router.navigate(['/note']);
  }
}
