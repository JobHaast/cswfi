import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Film } from '../film.model';
import { FilmService } from '../film.service';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'client-side-web-frameworks-individual-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
})
export class FilmListComponent implements OnInit, OnDestroy {
  films$: Observable<Film[]>;
  faEdit = faEdit;
  faTrash = faTrash;
  faBookOpen = faBookOpen;
  faPlus = faPlus;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    private filmService: FilmService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.films$ = this.filmService.getAll();
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteFilm(id: string): void {
    if (confirm('Are you sure you want to delete this film?')) {
      this.subscription = this.filmService.deleteFilm(id).subscribe(() => {
        this.toastr.success('Successfully deleted the film');
        this.films$ = this.filmService.getAll();
      });
    }
  }
}
