import { NgModule } from '@angular/core';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterService } from './services/router.service';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: 'view/noteview', component: NoteViewComponent },
      { path: 'view/listview', component: ListViewComponent },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet',
      },
      { path: '', redirectTo: 'view/noteview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    NoteComponent,
    NoteTakerComponent,
    NoteViewComponent,
    EditNoteOpenerComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    ListViewComponent,
    EditNoteViewComponent,
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [
    RouterService,
    NotesService,
    AuthenticationService,
    CanActivateRouteGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent],
})
export class AppModule {}
