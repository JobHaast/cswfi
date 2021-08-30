import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hall } from '../../hall.model';
import {
  faEdit,
  faBookOpen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { HallService } from '../../hall.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hall-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img src="assets/images/hall.jpg" class="card-img-top" alt="poster" />
        <div class="card-img-overlay">
          <a
            class="stretched-link"
            routerLink="details/{{ hall._id }}"
            *ngIf="(isAdmin$ | async) === false"
          ></a>
          <h5>{{ hall.name }}</h5>
          <div class="align-content-end ml-auto" *ngIf="isAdmin$ | async">
            <div
              class="card-img-overlay h-100 d-flex flex-column justify-content-end"
            >
              <div class="btn-group btn-group-sm align-content-end ml-auto">
                <a class="btn btn-primary" routerLink="edit/{{ hall._id }}">
                  <fa-icon [icon]="faEdit"></fa-icon>
                </a>
                <a class="btn btn-danger" (click)="sendId(hall._id)">
                  <fa-icon [icon]="faTrash"></fa-icon>
                </a>
                <a class="btn btn-dark" routerLink="details/{{ hall._id }}">
                  <fa-icon [icon]="faBookOpen"></fa-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./hall-card.component.css'],
})
export class HallCardComponent implements OnInit {
  @Input() hall: Hall;
  faEdit = faEdit;
  faTrash = faTrash;
  faBookOpen = faBookOpen;
  faPlus = faPlus;
  subscription: Subscription;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  @Output() event = new EventEmitter<string>();

  constructor(
    private hallService: HallService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
  }

  sendId(id: string) {
    this.event.emit(id);
  }
}
