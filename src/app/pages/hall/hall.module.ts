import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as fromComponents from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HallCardComponent } from './hall-list/hall-card/hall-card.component';
import { AdminGuardGuard } from 'src/app/admin-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: fromComponents.HallListComponent },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: fromComponents.HallDetailComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: fromComponents.HallEditComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromComponents.HallCreateComponent,
    canActivate: [AdminGuardGuard],
  },
];

@NgModule({
  declarations: [...fromComponents.components, HallCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HallModule {}
