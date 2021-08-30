import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as fromComponents from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuardGuard } from 'src/app/admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: fromComponents.ScreeningListComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: fromComponents.ScreeningEditComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromComponents.ScreeningCreateComponent,
    canActivate: [AdminGuardGuard],
  },
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ScreenigModule {}
