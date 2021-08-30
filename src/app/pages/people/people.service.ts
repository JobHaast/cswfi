import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService implements OnDestroy {
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

  getAll(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/people/${id}`);
  }

  getFriendsOfFriends(id: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/people/${id}/friendsoffriends`
    );
  }

  getFriends(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/people/${id}/friends`);
  }

  addFriend(userId: string, id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/people/${userId}/friends`, { id });
  }

  removeFriend(userId: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/people/${userId}/friends/${id}`);
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
