import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEdit,
  faBookOpen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Film } from '../../film/film.model';
import { FilmService } from '../../film/film.service';

@Component({
  selector: 'top-rated-film-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img src="{{ this.image }}" class="card-img-top" alt="poster" />
        <div class="card-img-overlay">
          <a
            class="stretched-link"
            routerLink="/films/details/{{ film._id }}"
          ></a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./top-rated-card.component.css'],
})
export class TopRatedCardComponent implements OnInit {
  @Input() film: Film;
  faEdit = faEdit;
  faTrash = faTrash;
  faBookOpen = faBookOpen;
  faPlus = faPlus;
  subscription: Subscription;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  baseUrl = environment.baseUrl;
  image: string;
  @Output() event = new EventEmitter<string>();

  constructor(
    private filmService: FilmService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
    if (this.film.banner != null) {
      this.image = `${this.baseUrl}/${this.film.banner}`;
    } else {
      this.image = 'assets/images/hall.jpg';
    }
  }

  sendId(id: string) {
    this.event.emit(id);
  }
}
