import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Actor } from './actor.model';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.baseUrl}/actors`);
  }

  getById(id: string): Observable<Actor> {
    return this.http.get<Actor>(`${this.baseUrl}/actors/${id}`);
  }

  editActor(id: string, actor: Actor): Observable<any> {
    const formData = this.createFormData(actor);

    return this.http.put(`${this.baseUrl}/actors/${id}`, formData, {
      headers: this.authService.createHeaders,
    });
  }

  deleteActor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/actors/${id}`, {
      headers: this.authService.createHeaders,
    });
  }

  createActor(actor: Actor): Observable<any> {
    const formData = this.createFormData(actor);

    return this.http
      .post<any>(`${this.baseUrl}/actors`, formData, {
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

  private createFormData(actor: Actor): FormData {
    const formData = new FormData();
    formData.append('firstName', actor.firstName);
    formData.append('lastName', actor.lastName);
    formData.append('birthDate', actor.birthDate.toString());
    formData.append('country', actor.country);
    formData.append('description', actor.description);
    if (actor.image != null) {
      formData.append('image', actor.image, actor.image.name);
    }
    return formData;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('handleError');
    return throwError(
      // 'Something bad happened; please try again later.'
      error.message || error.error.message
    );
  }
}
