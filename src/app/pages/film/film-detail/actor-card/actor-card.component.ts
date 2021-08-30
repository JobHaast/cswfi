import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/pages/actor/actor.model';
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
            routerLink="/actors/details/{{ actor._id }}"
          ></a>
          <h5>{{ actor.firstName }} {{ actor.lastName }}</h5>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./actor-card.component.css'],
})
export class ActorCardComponent implements OnInit {
  @Input() actor: Actor;
  baseUrl = environment.baseUrl;
  image: string;

  constructor() {}

  ngOnInit(): void {
    if (this.actor.image != null) {
      this.image = `${this.baseUrl}/${this.actor.image}`;
    } else {
      this.image = 'assets/images/hall.jpg';
    }
  }
}
