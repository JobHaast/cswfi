import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as fromComponents from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: fromComponents.PeopleListComponent,
  },
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    SharedModule,
  ],
})
export class PeopleModule {}
