import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private noteservice: NotesService) {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  ngOnInit(): void {
    this.noteservice.getNotes().subscribe(
      (data) => {
        this.notStartedNotes = data.filter(
          (res) => res.state === 'not-started' || res.state === undefined
        );
        this.startedNotes = data.filter((res) => res.state === 'started');
        this.completedNotes = data.filter((res) => res.state === 'completed');
      },
      (err) => console.log(err)
    );
  }
}
