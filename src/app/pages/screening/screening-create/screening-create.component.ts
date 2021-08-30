import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Film } from '../../film/film.model';
import { FilmService } from '../../film/film.service';
import { Hall } from '../../hall/hall.model';
import { HallService } from '../../hall/hall.service';
import { ScreeningService } from '../screening.service';

@Component({
  selector: 'client-side-web-frameworks-individual-screening-create',
  templateUrl: './screening-create.component.html',
  styleUrls: ['./screening-create.component.css'],
})
export class ScreeningCreateComponent implements OnInit, OnDestroy {
  screeningForm: FormGroup;
  subscription: Subscription;
  halls$: Observable<Hall[]>;
  films$: Observable<Film[]>;

  constructor(
    private screeningService: ScreeningService,
    private hallService: HallService,
    private router: Router,
    private filmService: FilmService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.screeningForm = new FormGroup({
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
      hall: new FormControl(null, [Validators.required]),
      film: new FormControl(null, [Validators.required]),
    });

    this.halls$ = this.hallService.getAll();
    this.films$ = this.filmService.getAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.screeningForm.valid) {
      this.subscription = this.screeningService
        .createScreening(this.screeningForm.value)
        .subscribe(() => {
          this.toastr.success('Succesfully created the screening');
          this.router.navigateByUrl('/screenings');
        });
    }
  }

  get start() {
    return this.screeningForm.get('start');
  }
  get end() {
    return this.screeningForm.get('end');
  }
  get hall() {
    return this.screeningForm.get('hall');
  }
  get film() {
    return this.screeningForm.get('film');
  }
}
