import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Actor } from '../../actor.model';
import {
  faEdit,
  faBookOpen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img
          src="{{ this.image }}"
          class="card-img-top"
          alt="profile picture"
        />
        <div class="card-img-overlay">
          <a
            class="stretched-link"
            routerLink="details/{{ actor._id }}"
            *ngIf="(isAdmin$ | async) === false"
          ></a>
          <h5>{{ actor.firstName }} {{ actor.lastName }}</h5>
          <div class="align-content-end ml-auto" *ngIf="isAdmin$ | async">
            <div
              class="card-img-overlay h-100 d-flex flex-column justify-content-end"
            >
              <div class="btn-group btn-group-sm align-content-end ml-auto">
                <a class="btn btn-primary" routerLink="edit/{{ actor._id }}">
                  <fa-icon [icon]="faEdit"></fa-icon>
                </a>
                <a class="btn btn-danger" (click)="sendId(actor._id)">
                  <fa-icon [icon]="faTrash"></fa-icon>
                </a>
                <a class="btn btn-dark" routerLink="details/{{ actor._id }}">
                  <fa-icon [icon]="faBookOpen"></fa-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./actor-card.component.css'],
})
export class ActorCardComponent implements OnInit, OnDestroy {
  @Input() actor: Actor;
  faEdit = faEdit;
  faTrash = faTrash;
  faBookOpen = faBookOpen;
  faPlus = faPlus;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  subscription: Subscription;
  baseUrl = environment.baseUrl;
  image: string;
  @Output() event = new EventEmitter<string>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
    if (this.actor.image != null) {
      this.image = `${this.baseUrl}/${this.actor.image}`;
    } else {
      this.image = 'assets/images/hall.jpg';
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  sendId(id: string) {
    this.event.emit(id);
  }
}
