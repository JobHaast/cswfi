import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../film/film.model';
import { FilmService } from '../film/film.service';

@Component({
  selector: 'client-side-web-frameworks-individual-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  films$: Observable<Film[]>;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.films$ = this.filmService.topRated();
  }
}
