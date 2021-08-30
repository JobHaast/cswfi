import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import {
  delay,
  filter,
  mergeMap,
  take,
  catchError,
  retry,
  tap,
} from 'rxjs/operators';
import { User } from './user.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private baseUrl = environment.baseUrl;
  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  editUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user, {
      headers: this.authService.createHeaders,
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`, {
      headers: this.authService.createHeaders,
    });
  }

  createUser(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/users`, user, {
        headers: this.authService.createHeaders,
      })
      .pipe(
        catchError((error) => {
          this.toastr.error('This email is already registered to an account!');
          return this.handleError(error);
        }) // then handle the error
      );
  }

  addFilm(filmId: string, userId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/users/${userId}/films`,
      { filmId },
      {
        headers: this.authService.createHeaders,
      }
    );
  }

  removeFilm(filmId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}/films/${filmId}`, {
      headers: this.authService.createHeaders,
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
