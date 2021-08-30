import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: User;
  subscription1: Subscription;
  subscription2: Subscription;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      birthDate: new FormControl(this.user.birthDate),
      password: new FormControl(this.user.password, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
      confirm: new FormControl(this.user.confirm, [Validators.required]),
      phoneNumber: new FormControl(this.user.phoneNumber, [
        Validators.required,
        this.validPhonenumber.bind(this),
      ]),
    });

    this.subscription1 = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.userService.getById(params.get('id'))
        )
      )
      .subscribe((user) => {
        this.user = user;
        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          birthDate: formatDate(this.user.birthDate, 'yyyy-MM-dd', 'en-US'),
          phoneNumber: this.user.phoneNumber,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.subscription2 = this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.userService.editUser(params.get('id'), this.userForm.value)
          )
        )
        .subscribe(() => {
          this.router.navigateByUrl('/users');
          this.toastr.success('Successfully edited the user');
        });
    }
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
