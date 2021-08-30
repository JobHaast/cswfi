import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'client-side-web-frameworks-individual-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        this.validPassword.bind(this),
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.subscription = this.authService.login(this.loginForm.value);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
