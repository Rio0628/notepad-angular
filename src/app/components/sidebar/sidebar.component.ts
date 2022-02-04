import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarOpen = '';
  @Input() notes: any;
  addNoteToView = false;

  setAddNote = () => this.addNoteToView === false ? this.addNoteToView = true : this.addNoteToView = false;

  showAddNote = () => this.addNoteToView ? 'addNoteForm active' : 'addNoteForm';

  showAddNoteBtn = () => this.addNoteToView ? 'addNoteBtnAct' : 'addNoteBtn';

  sidebarStatus = () => this.sidebarOpen === 'open' ? "sidenavCntr active" : 'sidenavCntr';

  ngOnInit(): void {
  }
}

