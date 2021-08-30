import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Film, Genres, Ratings } from '../film.model';
import { FilmService } from '../film.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActorService } from '../../actor/actor.service';
import { Actor } from '../../actor/actor.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'client-side-web-frameworks-individual-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css'],
})
export class FilmEditComponent implements OnInit {
  film: Film;
  subscription1: Subscription;
  subscription2: Subscription;
  filmForm: FormGroup;
  genresEnum = Genres;
  ratings = Ratings;
  actors$: Observable<Actor[]>;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.filmForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      released: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      runtime: new FormControl(null, [Validators.required, Validators.min(1)]),
      banner: new FormControl(null),
      rated: new FormControl(null, [Validators.required]),
      genres: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [
        Validators.min(1),
        Validators.max(10),
        Validators.required,
      ]),
      actors: new FormControl(null, [Validators.required]),
    });

    this.subscription1 = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.filmService.getById(params.get('id'))
        )
      )
      .subscribe((film) => {
        this.film = film;
        this.filmForm.patchValue({
          title: this.film.title,
          released: formatDate(this.film.released, 'yyyy-MM-dd', 'en-US'),
          description: this.film.description,
          runtime: this.film.runtime,
          rated: this.film.rated,
          genres: this.film.genres,
          rating: this.film.rating,
          actor: this.film.actors,
        });
      });

    this.actors$ = this.actorService.getAll();
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      this.subscription2 = this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.filmService.editFilm(params.get('id'), this.filmForm.value)
          )
        )
        .subscribe(() => {
          this.router.navigateByUrl('/films');
          this.toastr.success('Successfully edited the film');
        });
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.filmForm.patchValue({ banner: file });
    this.filmForm.get('banner').updateValueAndValidity();
    console.log(file);
    console.log(this.filmForm);
  }

  get title() {
    return this.filmForm.get('title');
  }
  get released() {
    return this.filmForm.get('released');
  }
  get description() {
    return this.filmForm.get('description');
  }
  get runtime() {
    return this.filmForm.get('runtime');
  }
  get rated() {
    return this.filmForm.get('rated');
  }
  get genres() {
    return this.filmForm.get('genres');
  }
  get actors() {
    return this.filmForm.get('actors');
  }
  get rating() {
    return this.filmForm.get('rating');
  }
}
