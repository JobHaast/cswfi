import { DatePipe, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Actor, Country } from '../actor.model';
import { ActorService } from '../actor.service';

@Component({
  selector: 'client-side-web-frameworks-individual-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css'],
})
export class ActorEditComponent implements OnInit, OnDestroy {
  actorForm: FormGroup;
  actor: Actor;
  countries = Country;
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.actorForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      birthDate: new FormControl(null),
      description: new FormControl(null),
      country: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    });

    this.subscription1 = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.actorService.getById(params.get('id'))
        )
      )
      .subscribe((actor) => {
        this.actor = actor;
        this.actorForm.patchValue({
          firstName: this.actor.firstName,
          lastName: this.actor.lastName,
          birthDate: formatDate(this.actor.birthDate, 'yyyy-MM-dd', 'en-US'),
          description: this.actor.description,
          country: this.actor.country,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  onSubmit(): void {
    if (this.actorForm.valid) {
      this.subscription2 = this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.actorService.editActor(params.get('id'), this.actorForm.value)
          )
        )
        .subscribe(() => {
          this.toastr.success('Successfully edited the actor');
          this.router.navigateByUrl('/actors');
        });
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.actorForm.patchValue({ image: file });
    this.actorForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.actorForm);
  }

  get firstName() {
    return this.actorForm.get('firstName');
  }
  get lastName() {
    return this.actorForm.get('lastName');
  }
  get birthDate() {
    return this.actorForm.get('birthDate');
  }
  get description() {
    return this.actorForm.get('description');
  }
  get country() {
    return this.actorForm.get('country');
  }
  get image() {
    return this.actorForm.get('image');
  }
}
