import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css'],
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteservice: NotesService
  ) {
    this.errMessage = '';
    this.note = new Note();
    const noteData = this.noteservice.getNoteById(this.data.noteId);
    if (noteData !== undefined) {
      this.note = JSON.parse(JSON.stringify(noteData));
    }
  }
  ngOnInit(): void {}
  onSave() {
    this.noteservice.editNote(this.note).subscribe(
      (data) => {
        this.dialogRef.close();
      },
      (error) => {
        this.errMessage = error.message;
      }
    );
  }
}
