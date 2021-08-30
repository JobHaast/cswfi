import { Injectable } from '@angular/core';
import { Login } from './login/login.model';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import {
  delay,
  filter,
  mergeMap,
  take,
  catchError,
  retry,
  tap,
} from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../pages/user/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  public isLoggedInUser = new BehaviorSubject<boolean>(false);
  public loggedInEmail = new BehaviorSubject<string>('');
  private isAdminUser = new BehaviorSubject<boolean>(false);
  private isPlainUser = new BehaviorSubject<boolean>(false);
  private tokenTimer;

  private readonly currentUser = 'currentuser';
  private readonly currentToken = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getCurrentUser().subscribe({
      next: (user: User) => {
        console.log(`${user.email} logged in`);
        this.isLoggedInUser.next(true);
        this.loggedInEmail.next(user.email);
        this.isAdminUser.next(user.admin);
        this.isPlainUser.next(!user.admin);
      },
      error: (message) => {
        this.isLoggedInUser.next(false);
        this.isAdminUser.next(false);
        this.isPlainUser.next(false);
      },
    });
  }

  login(login: Login) {
    return this.http.post(`${this.baseUrl}/login`, login).subscribe({
      next: (response: any) => {
        const currentUser = new User(response.user);
        console.log(currentUser);
        this.setSession(response);
        this.isLoggedInUser.next(true);
        this.loggedInEmail.next(currentUser.email);
        this.isAdminUser.next(currentUser.admin);
        this.isPlainUser.next(!currentUser.admin);
        console.log(response);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, response.exp);
        this.router.navigateByUrl('/dashboard');
        this.toastr.success('You succesfully logged in');
      },
      error: (message: any) => {
        console.log('error:', message);
        this.toastr.error('Invalid credentials');
      },
    });
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user).subscribe({
      next: (response: any) => {
        const currentUser = new User(response.user);
        console.log(currentUser);
        this.setSession(response);
        this.isLoggedInUser.next(true);
        this.loggedInEmail.next(currentUser.email);
        this.isAdminUser.next(currentUser.admin);
        this.isPlainUser.next(!currentUser.admin);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, response.exp);
        this.router.navigateByUrl('/dashboard');
        this.toastr.success('You succesfully registered a new account');
      },
      error: (message: any) => {
        console.log('error:', message);
        this.toastr.error(message.error.error);
      },
    });
  }

  private setSession(authResult) {
    localStorage.setItem(this.currentToken, authResult.token);
    localStorage.setItem(this.currentUser, JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem(this.currentUser);
    localStorage.removeItem(this.currentToken);
    this.isLoggedInUser.next(false);
    this.isAdminUser.next(false);
    this.tokenTimer = null;
    this.router.navigateByUrl('/dashboard');
    this.toastr.success('You are now logged out');
  }

  /**
   * Get the currently logged in user.
   */
  getCurrentUser(): Observable<User> {
    return new Observable((observer) => {
      const localUser: any = JSON.parse(localStorage.getItem(this.currentUser));
      console.log('localUser', localUser);
      if (localUser) {
        console.log('localUser found');
        observer.next(new User(localUser));
        observer.complete();
      } else {
        console.log('NO localUser found');
        observer.complete();
      }
    });
  }

  get userEmail(): Observable<string> {
    return this.loggedInEmail.asObservable();
  }

  /**
   *
   */
  get userIsLoggedIn(): Observable<boolean> {
    console.log('userIsLoggedIn() ' + this.isLoggedInUser.value);
    return this.isLoggedInUser.asObservable();
  }

  /**
   *
   */
  get userIsAdmin(): Observable<boolean> {
    console.log('userIsAdmin() ' + this.isAdminUser.value);
    return this.isAdminUser.asObservable();
  }

  /**
   *
   */
  get userIsPlain(): Observable<boolean> {
    console.log('userIsPlain() ' + this.isPlainUser.value);
    return this.isPlainUser.asObservable();
  }

  get accessToken(): string {
    return localStorage.getItem(this.currentToken);
  }

  get createHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
