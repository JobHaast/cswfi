import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/user/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'client-side-web-frameworks-individual-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

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

  onSubmit(): void {
    if (this.userForm.valid) {
      this.subscription = this.authService.register(this.userForm.value);
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
