import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isNoteView = true;
  constructor(private routerservice: RouterService) {}
  ngOnInit(): void {}
  goToListView() {
    this.isNoteView = false;
    this.routerservice.routeToListView();
  }
  gotoNotesView() {
    this.isNoteView = true;
    this.routerservice.routeToNoteView();
  }
}
