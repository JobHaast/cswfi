import { FilmListComponent } from './film-list/film-list.component';
import { FilmCreateComponent } from './film-create/film-create.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmEditComponent } from './film-edit/film-edit.component';

export const components: any[] = [
  FilmCreateComponent,
  FilmDetailComponent,
  FilmListComponent,
  FilmEditComponent
];

export * from './film-list/film-list.component';
export * from './film-create/film-create.component';
export * from './film-detail/film-detail.component';
export * from './film-edit/film-edit.component';

