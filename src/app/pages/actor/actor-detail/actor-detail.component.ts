import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Actor } from '../actor.model';
import { ActorService } from '../actor.service';

@Component({
  selector: 'client-side-web-frameworks-individual-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
})
export class ActorDetailComponent implements OnInit {
  actor$: Observable<Actor>;
  baseUrl = environment.baseUrl;
  image: string;

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actor$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.actorService.getById(params.get('id'))
      )
    );
  }
}
