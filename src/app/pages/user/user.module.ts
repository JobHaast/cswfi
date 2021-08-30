import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as fromComponents from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuardGuard } from 'src/app/admin-guard.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollowingCardComponent } from './user-detail/following-card/following-card.component';
import { FilmListCardComponent } from './user-detail/film-list-card/film-list-card.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: fromComponents.UserListComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: fromComponents.UserEditComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: fromComponents.UserDetailComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromComponents.UserCreateComponent,
    canActivate: [AdminGuardGuard],
  },
];

@NgModule({
  declarations: [
    ...fromComponents.components,
    FollowingCardComponent,
    FilmListCardComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UserModule {}
