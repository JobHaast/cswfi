import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBookOpen, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Film } from 'src/app/pages/film/film.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'film-list-card',
  template: `
    <div class="col mb-4">
      <div class="card text-white">
        <img src="{{ this.image }}" class="card-img-top" alt="poster" />
        <a
          class="stretched-link"
          *ngIf="isOwner == false"
          routerLink="/films/details/{{ film._id }}"
        ></a>
        <div class="card-img-overlay" *ngIf="isOwner">
          <div
            class="card-img-overlay h-100 d-flex flex-column justify-content-end"
          >
            <div class="btn-group btn-group-sm align-content-end ml-auto">
              <a
                class="btn btn-dark"
                routerLink="/films/details/{{ film._id }}"
              >
                <fa-icon [icon]="faBookOpen"></fa-icon>
              </a>
              <a class="btn btn-danger" (click)="sendId(film._id)">
                <fa-icon [icon]="faMinus"></fa-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./film-list-card.component.css'],
})
export class FilmListCardComponent implements OnInit {
  @Input() film: Film;
  @Input() isOwner: boolean;
  faMinus = faMinus;
  faBookOpen = faBookOpen;
  baseUrl = environment.baseUrl;
  image: string;
  @Output() event = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
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
