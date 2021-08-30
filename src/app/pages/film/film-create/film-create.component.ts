import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Actor } from '../../actor/actor.model';
import { ActorService } from '../../actor/actor.service';
import { Genres, Ratings } from '../film.model';
import { FilmService } from '../film.service';

@Component({
  selector: 'client-side-web-frameworks-individual-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css'],
})
export class FilmCreateComponent implements OnInit {
  subscription: Subscription;
  filmForm: FormGroup;
  genresEnum = Genres;
  ratings = Ratings;
  actors$: Observable<Actor[]>;

  constructor(
    private filmService: FilmService,
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
      banner: new FormControl(null, [Validators.required]),
      rated: new FormControl(null, [Validators.required]),
      genres: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [
        Validators.min(1),
        Validators.max(10),
        Validators.required,
      ]),
      actors: new FormControl(null, [Validators.required]),
    });

    this.actors$ = this.actorService.getAll();
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      this.subscription = this.filmService
        .createFilm(this.filmForm.value)
        .subscribe(() => {
          this.toastr.success('Successfully created new film');
          this.router.navigateByUrl('/films');
        });
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
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
  get banner() {
    return this.filmForm.get('banner');
  }
}
