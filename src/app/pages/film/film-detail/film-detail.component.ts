import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user/user.service';
import { Film } from '../film.model';
import { FilmService } from '../film.service';

@Component({
  selector: 'client-side-web-frameworks-individual-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
})
export class FilmDetailComponent implements OnInit {
  film$: Observable<Film>;
  baseUrl = environment.baseUrl;
  subscription: Subscription;
  isAdmin$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.film$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
      switchMap((params: ParamMap) =>
        this.filmService.getById(params.get('id'))
      )
    );
    this.isAdmin$ = this.authService.userIsAdmin;
    this.isLoggedIn$ = this.authService.isLoggedInUser;
  }

  addFilm(filmId: string): void {
    this.subscription = this.authService.getCurrentUser().subscribe((user) => {
      this.userService.addFilm(filmId, user._id).subscribe(() => {
        this.toastr.success('Added film to you list');
        this.router.navigateByUrl(`/users/details/${user._id}`);
      });
    });
  }
}
