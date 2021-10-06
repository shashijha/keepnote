import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css'],
})
export class EditNoteOpenerComponent implements OnInit {
  noteId: number;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerservice: RouterService
  ) {
    this.activatedRoute.params.subscribe(
      (parms) => (this.noteId = parms.noteId)
    );
    if (this.noteId && this.noteId !== undefined) {
      this.dialog
        .open(EditNoteViewComponent, {
          data: {
            noteId: this.noteId,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          this.routerservice.routeBack();
        });
    }
  }

  ngOnInit(): void {}
}
