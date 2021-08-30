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
import { Screening } from './screening.model';
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
export class ScreeningService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Screening[]> {
    return this.http.get<Screening[]>(`${this.baseUrl}/screenings`);
  }

  getById(id: string): Observable<Screening> {
    console.log(`${this.baseUrl}/screenings/${id}`);
    return this.http.get<Screening>(`${this.baseUrl}/screenings/${id}`);
  }

  editScreening(id: string, screening: Screening) {
    return this.http.put(`${this.baseUrl}/screenings/${id}`, screening, {
      headers: this.authService.createHeaders,
    });
  }

  deleteScreening(id: string): Observable<any> {
    console.log(`${this.baseUrl}/screenings/${id}`);
    return this.http.delete(`${this.baseUrl}/screenings/${id}`, {
      headers: this.authService.createHeaders,
    });
  }

  createScreening(screening: Screening): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/screenings`, screening, {
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
