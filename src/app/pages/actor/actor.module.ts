import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as fromComponents from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActorCardComponent } from './actor-list/actor-card/actor-card.component';
import { AdminGuardGuard } from 'src/app/admin-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: fromComponents.ActorListComponent },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: fromComponents.ActorDetailComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: fromComponents.ActorEditComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromComponents.ActorCreateComponent,
  },
];

@NgModule({
  declarations: [...fromComponents.components, ActorCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ActorModule {}
