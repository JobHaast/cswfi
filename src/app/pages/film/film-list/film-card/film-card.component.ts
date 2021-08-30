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
import { Film } from '../../film.model';
import { FilmService } from '../../film.service';

@Component({
  selector: 'app-film-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img src="{{ this.image }}" class="card-img-top" alt="poster" />
        <div class="card-img-overlay">
          <a
            class="stretched-link"
            routerLink="details/{{ film._id }}"
            *ngIf="(isAdmin$ | async) === false"
          ></a>
          <div class="align-content-end ml-auto" *ngIf="isAdmin$ | async">
            <div
              class="card-img-overlay h-100 d-flex flex-column justify-content-end"
            >
              <div class="btn-group btn-group-sm align-content-end ml-auto">
                <a class="btn btn-primary" routerLink="edit/{{ film._id }}">
                  <fa-icon [icon]="faEdit"></fa-icon>
                </a>
                <a class="btn btn-danger" (click)="sendId(film._id)">
                  <fa-icon [icon]="faTrash"></fa-icon>
                </a>
                <a class="btn btn-dark" routerLink="details/{{ film._id }}">
                  <fa-icon [icon]="faBookOpen"></fa-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./film-card.component.css'],
})
export class FilmCardComponent implements OnInit {
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

  constructor(private authService: AuthService) {}

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
