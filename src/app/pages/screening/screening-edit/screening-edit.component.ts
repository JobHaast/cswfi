import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Film } from '../../film/film.model';
import { FilmService } from '../../film/film.service';
import { Hall } from '../../hall/hall.model';
import { HallService } from '../../hall/hall.service';
import { Screening } from '../screening.model';
import { ScreeningService } from '../screening.service';

@Component({
  selector: 'client-side-web-frameworks-individual-screening-edit',
  templateUrl: './screening-edit.component.html',
  styleUrls: ['./screening-edit.component.css'],
})
export class ScreeningEditComponent implements OnInit, OnDestroy {
  screening: Screening;
  screeningForm: FormGroup;
  subscription1: Subscription;
  subscription2: Subscription;
  halls$: Observable<Hall[]>;
  films$: Observable<Film[]>;

  constructor(
    private screeningService: ScreeningService,
    private hallService: HallService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.subscription1 = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.screeningService.getById(params.get('id'))
        )
      )
      .subscribe((screening) => {
        this.screening = screening;
        this.screeningForm.patchValue({
          start: formatDate(this.screening.start, 'yyyy-MM-ddThh:mm', 'en-US'),
          end: formatDate(this.screening.end, 'yyyy-MM-ddThh:mm', 'en-US'),
          hall: this.screening.hall,
          film: this.screening.film,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  onSubmit(): void {
    if (this.screeningForm.valid) {
      this.subscription2 = this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.screeningService.editScreening(
              params.get('id'),
              this.screeningForm.value
            )
          )
        )
        .subscribe(() => {
          this.toastr.success('Succesfully edited the screening');
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
