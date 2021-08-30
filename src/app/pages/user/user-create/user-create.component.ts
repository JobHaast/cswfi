import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'client-side-web-frameworks-individual-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      birthDate: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
      confirm: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        this.validPhonenumber.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    this.subscription = this.userService
      .createUser(this.userForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('/users');
        this.toastr.success('Created new user');
      });
  }

  validEmail(control: FormControl): { [s: string]: boolean } {
    const email = control.value;
    const regexp = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return null;
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } {
    const password = control.value;
    const regexp = new RegExp(
      /^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/
    );
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null;
    }
  }

  validPhonenumber(control: FormControl): { [s: string]: boolean } {
    const phoneNumber = control.value;
    const regexp = new RegExp(/^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/);
    if (regexp.test(phoneNumber) !== true) {
      return { phoneNumber: true };
    } else {
      return null;
    }
  }

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get birthDate() {
    return this.userForm.get('birthDate');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirm() {
    return this.userForm.get('confirm');
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }
}
