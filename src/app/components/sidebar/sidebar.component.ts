import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Note } from '../../note';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarOpen = '';
  addNoteToView = false;
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
  }

  test(id: any) {
    console.log(id);

  }

  test2() {
    this.sidebarOpen = 'close';
    this.router.navigate(['/note']);
  }
}

