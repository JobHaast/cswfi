import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBookOpen, faMinus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../user.model';

@Component({
  selector: 'app-following-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img
          src="assets/images/standardProfilePicture.jpg"
          class="card-img-top"
          alt="profile picture"
        />
        <div class="card-img-overlay">
          <a
            class="stretched-link"
            *ngIf="isOwner == false"
            routerLink="/users/details/{{ user._id }}"
          ></a>
          <div class="align-content-end ml-auto" *ngIf="isOwner">
            <div
              class="card-img-overlay h-100 d-flex flex-column justify-content-end"
            >
              <div class="btn-group btn-group-sm align-content-end ml-auto">
                <a
                  class="btn btn-dark"
                  routerLink="/users/details/{{ user._id }}"
                >
                  <fa-icon [icon]="faBookOpen"></fa-icon>
                </a>
                <a class="btn btn-danger">
                  <fa-icon
                    [icon]="faMinus"
                    (click)="removeFollow(user._id)"
                  ></fa-icon>
                </a>
              </div>
            </div>
          </div>
          <h5>{{ user.firstName }} {{ user.lastName }}</h5>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./following-card.component.css'],
})
export class FollowingCardComponent implements OnInit {
  @Input() user: User;
  @Input() isOwner: boolean;
  faMinus = faMinus;
  faBookOpen = faBookOpen;
  @Output() event = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  removeFollow(id: string): void {
    this.event.emit(id);
  }
}
