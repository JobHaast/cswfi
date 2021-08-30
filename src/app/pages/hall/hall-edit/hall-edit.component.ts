import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Hall } from '../hall.model';
import { HallService } from '../hall.service';

@Component({
  selector: 'client-side-web-frameworks-individual-hall-edit',
  templateUrl: './hall-edit.component.html',
  styleUrls: ['./hall-edit.component.css'],
})
export class HallEditComponent implements OnInit, OnDestroy {
  hallForm: FormGroup;
  hall: Hall;
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(
    private hallService: HallService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.hallForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      seats: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });

    this.subscription1 = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.hallService.getById(params.get('id'))
        )
      )
      .subscribe((hall) => {
        this.hall = hall;
        this.hallForm.patchValue({
          name: this.hall.name,
          seats: this.hall.seats,
          description: this.hall.description,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  onSubmit() {
    if (this.hallForm.valid) {
      this.subscription2 = this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.hallService.editHall(params.get('id'), this.hallForm.value)
          )
        )
        .subscribe(() => {
          this.toastr.success('Successfully edited the hall');
          this.router.navigateByUrl('/halls');
        });
    }
  }

  get name() {
    return this.hallForm.get('name');
  }
  get seats() {
    return this.hallForm.get('seats');
  }
  get description() {
    return this.hallForm.get('description');
  }
}
