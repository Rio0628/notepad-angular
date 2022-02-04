import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Note } from '../../note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addNoteToView = false;
  notes: Note[] | undefined;
  
  constructor(private apiService: ApiService) { }

  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;
  
  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm'; 
  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  ngOnInit(): void {
    this.apiService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
      console.log(this.notes);
    })
  }

  deleteNote(id: any) {
    this.apiService.delete(id).subscribe(res => {
      this.notes = this.notes?.filter(item => item.id !== id);
      console.log("Person Deleted Successfully!");
    })
  }

  test() {

  }
}
