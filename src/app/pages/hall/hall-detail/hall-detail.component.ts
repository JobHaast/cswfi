import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Hall } from '../hall.model';
import { HallService } from '../hall.service';

@Component({
  selector: 'client-side-web-frameworks-individual-hall-detail',
  templateUrl: './hall-detail.component.html',
  styleUrls: ['./hall-detail.component.css'],
})
export class HallDetailComponent implements OnInit {
  hall$: Observable<Hall>;

  constructor(
    private hallService: HallService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hall$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
      switchMap((params: ParamMap) =>
        this.hallService.getById(params.get('id'))
      )
    );
  }
}
