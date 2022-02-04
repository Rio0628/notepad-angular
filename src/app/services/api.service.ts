import { Injectable } from '@angular/core';
import { Note } from '../note';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private API_URL  = 'http://localhost:8000/api/note/' 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}
  
  getAll(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.API_URL).pipe( catchError(this.errorHandler) )
  }

  create(note): Observable<Note> {
    return this.httpClient.post<Note>(this.API_URL, JSON.stringify(note), this.httpOptions).pipe(catchError(this.errorHandler))
  }

  find(id): Observable<Note> {
    return this.httpClient.get<Note>(this.API_URL + id).pipe(this.errorHandler)
  }

  update(id, note): Observable<Note> {
    return this.httpClient.put<Note>(this.API_URL + id, JSON.stringify(note), this.httpOptions).pipe( catchError(this.errorHandler) )
  }

  delete(id) {
    return this.httpClient.delete<Note>(this.API_URL + id, this.httpOptions).pipe( catchError(this.errorHandler))
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(errorMessage);
  }

 
/*   readNotes(): Observable<Note[]> {
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
  }*/
}

