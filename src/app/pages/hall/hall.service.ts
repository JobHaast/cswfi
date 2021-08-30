import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import {
  delay,
  filter,
  mergeMap,
  take,
  catchError,
  retry,
  tap,
} from 'rxjs/operators';
import { Hall } from './hall.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${this.baseUrl}/halls`);
  }

  getById(id: string): Observable<Hall> {
    return this.http.get<Hall>(`${this.baseUrl}/halls/${id}`);
  }

  editHall(id: string, user: Hall): Observable<any> {
    return this.http.put(`${this.baseUrl}/halls/${id}`, user, {
      headers: this.authService.createHeaders,
    });
  }

  deleteHall(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/halls/${id}`, {
      headers: this.authService.createHeaders,
    });
  }

  createHall(hall: Hall): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/halls`, hall, {
        headers: this.authService.createHeaders,
      })
      .pipe(
        catchError(this.handleError), // then handle the error
        tap(
          // Log the result or error
          (data) => console.log(data)
          // ,
          // error => console.error(error)
        )
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('handleError');
    return throwError(
      // 'Something bad happened; please try again later.'
      error.message || error.error.message
    );
  }
}
