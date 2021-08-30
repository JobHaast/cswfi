import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Country } from '../actor.model';
import { ActorService } from '../actor.service';

@Component({
  selector: 'client-side-web-frameworks-individual-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css'],
})
export class ActorCreateComponent implements OnInit, OnDestroy {
  actorForm: FormGroup;
  countries = Country;
  subscription: Subscription;

  constructor(
    private actorService: ActorService,
    private router: Router,
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
      birthDate: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.actorForm.valid) {
      this.subscription = this.actorService
        .createActor(this.actorForm.value)
        .subscribe(() => {
          this.toastr.success('Successfully created the actor');
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
