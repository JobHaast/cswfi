import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { UsecasesComponent } from './pages/about/usecases/usecases.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
      { path: 'about', pathMatch: 'full', component: UsecasesComponent },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'films',
        loadChildren: () =>
          import('./pages/film/film.module').then((m) => m.FilmModule),
      },
      {
        path: 'actors',
        loadChildren: () =>
          import('./pages/actor/actor.module').then((m) => m.ActorModule),
      },
      {
        path: 'halls',
        loadChildren: () =>
          import('./pages/hall/hall.module').then((m) => m.HallModule),
      },
      {
        path: 'screenings',
        loadChildren: () =>
          import('./pages/screening/screening.module').then(
            (m) => m.ScreenigModule
          ),
      },
      {
        path: 'people',
        loadChildren: () =>
          import('./pages/people/people.module').then((m) => m.PeopleModule),
      },
    ],
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
