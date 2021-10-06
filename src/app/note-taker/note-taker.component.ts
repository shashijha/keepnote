import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  errMessage: string;
  note: Note;
  constructor(private noteservice: NotesService) {
    this.note = new Note();
    this.errMessage = '';
  }

  addNote() {
    const title = this.note.title;
    const text = this.note.text;
    if (
      title !== null &&
      text !== null &&
      title !== undefined &&
      text !== undefined &&
      title !== '' &&
      text !== ''
    ) {

      this.noteservice.addNote(this.note).subscribe(
        (data) => {
          this.note = new Note();
        },
        (error) => {
          this.errMessage = error.message;
          this.note = new Note();
        }
      );
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
