import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HallService } from '../hall.service';

@Component({
  selector: 'client-side-web-frameworks-individual-hall-create',
  templateUrl: './hall-create.component.html',
  styleUrls: ['./hall-create.component.css'],
})
export class HallCreateComponent implements OnInit, OnDestroy {
  hallForm: FormGroup;
  subscription: Subscription;

  constructor(
    private hallService: HallService,
    private router: Router,
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
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (this.hallForm.valid) {
      this.subscription = this.hallService
        .createHall(this.hallForm.value)
        .subscribe(() => {
          this.toastr.success('Successfully created the hall');
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
