import { Injectable } from '@angular/core';
import { Note } from '../note';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER  = 'http://localhost/database/api' // Check if the location is the correct one
  constructor(private httpClient: HttpClient) {}
  
  readNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  createNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(`${this.PHP_API_SERVER}/create.php`, note);
  }

  updateNote(note: Note) {
    return this.httpClient.put<Note>(`${this.PHP_API_SERVER}/update.php`, note);
  }

  deleteNote(id: number) {
    return this.httpClient.delete<Note>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
  }

}

