import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  url = 'http://localhost:3000/api/v1/notes';

  constructor(
    private httpclient: HttpClient,
    private authservice: AuthenticationService
  ) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer() {
    console.log('called fetch notes from server');
    return this.httpclient
      .get<Note[]>('http://localhost:3000/api/v1/notes', {
        headers: new HttpHeaders().set(
          'Authorization',
          `${this.authservice.getBearerToken()}`
        ),
      })
      .subscribe(
        (notesResult) => {
          this.notes = notesResult;
          this.notesSubject.next(this.notes);
        },
        (err: any) => {
          this.notesSubject.error(err);
        }
      );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpclient
      .post<Note>(this.url, note, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.authservice.getBearerToken()}`
        ),
      })
      .pipe(
        tap((addedNote) => {
          this.notes.push(addedNote);
          this.notesSubject.next(this.notes);
        })
      );
  }

  editNote(note: Note): Observable<Note> {
    return this.httpclient
      .put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
        headers: new HttpHeaders().set(
          'Authorization',
          `${this.authservice.getBearerToken()}`
        ),
      })
      .pipe(
        tap((editedNote) => {
          const existingNote = this.notes.find(
            (res) => res.id === editedNote.id
          );
          Object.assign(existingNote, editedNote);
          this.notesSubject.next(this.notes);
        })
      );
  }

  getNoteById(noteId: any): Note {
    const foundnote = this.notes.find((res) => res.id === parseInt(noteId, 10));
    return foundnote;
  }
}
