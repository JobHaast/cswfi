import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as fromComponents from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmCardComponent } from './film-list/film-card/film-card.component';
import { AdminGuardGuard } from 'src/app/admin-guard.guard';
import { ScreeningCardComponent } from './film-detail/screening-card/screening-card.component';
import { ActorCardComponent } from './film-detail/actor-card/actor-card.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: fromComponents.FilmListComponent },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: fromComponents.FilmDetailComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: fromComponents.FilmEditComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromComponents.FilmCreateComponent,
    canActivate: [AdminGuardGuard],
  },
];

@NgModule({
  declarations: [
    ...fromComponents.components,
    FilmCardComponent,
    ScreeningCardComponent,
    ActorCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FilmModule {}
