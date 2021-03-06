import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css'],
})
export class NoteViewComponent implements OnInit {
  notes: Array<Note>;
  constructor(private noteservice: NotesService) {
    this.notes = [];
  }

  ngOnInit(): void {
    this.noteservice.getNotes().subscribe(
      (data) => (this.notes = data),
      (err) => {
        console.log(err);
      }
    );
  }
}
