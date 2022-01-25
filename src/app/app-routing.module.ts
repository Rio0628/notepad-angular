import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNoteViewComponent } from './components/main-note-view/main-note-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'note', component: MainNoteViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
