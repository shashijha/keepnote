import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;

  constructor(private routerservice: RouterService) {}
  ngOnInit(): void {}

  openEditView() {
    this.routerservice.routeToEditNoteView(this.note.id);
  }
}
