import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/pages/user/user.model';

@Component({
  selector: 'app-person-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img
          src="assets/images/standardProfilePicture.jpg"
          class="card-img-top"
          alt="profile picture"
        />
        <div class="card-img-overlay">
          <div class="align-content-end ml-auto">
            <div
              class="card-img-overlay h-100 d-flex flex-column justify-content-end"
            >
              <div class="btn-group btn-group-sm align-content-end ml-auto">
                <a
                  class="btn btn-secondary"
                  routerLink="/users/details/{{ user._id }}"
                >
                  <fa-icon [icon]="faBookOpen"></fa-icon>
                </a>
                <a class="btn btn-success">
                  <fa-icon [icon]="faPlus" (click)="sendId(user._id)"></fa-icon>
                </a>
              </div>
            </div>
          </div>
          <h5>{{ user.firstName }} {{ user.lastName }}</h5>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./person-card.component.css'],
})
export class PersonCardComponent implements OnInit {
  @Input() user: User;
  faPlus = faPlus;
  faBookOpen = faBookOpen;
  @Output() event = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  sendId(id: string) {
    this.event.emit(id);
  }
}
