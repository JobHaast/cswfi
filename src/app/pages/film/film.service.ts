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
import { Film } from './film.model';
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
export class FilmService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  getAll(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films`);
  }

  getById(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.baseUrl}/films/${id}`);
  }

  editFilm(id: string, film: Film): Observable<any> {
    const formData = this.createFormData(film);

    return this.http.put(`${this.baseUrl}/films/${id}`, formData, {
      headers: this.authService.createHeaders,
    });
  }

  deleteFilm(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/films/${id}`, {
      headers: this.authService.createHeaders,
    });
  }

  createFilm(film: Film): Observable<any> {
    const formData = this.createFormData(film);

    return this.http
      .post<any>(`${this.baseUrl}/films`, formData, {
        headers: this.authService.createHeaders,
      })
      .pipe(
        catchError((error) => {
          this.toastr.error(error);
          return this.handleError(error);
        }) // then handle the error
      );
  }

  topRated(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films/toprated`);
  }

  private createFormData(film: Film): FormData {
    const formData = new FormData();
    formData.append('title', film.title);
    formData.append('description', film.description);
    formData.append('genres', JSON.stringify(film.genres));
    formData.append('runtime', film.runtime?.toString());
    formData.append('released', film.released?.toString());
    formData.append('rating', film.rating?.toString());
    formData.append('rated', JSON.stringify(film.rated));
    formData.append('actors', JSON.stringify(film.actors));
    if (film.banner != null) {
      formData.append('banner', film.banner, film.banner.name);
    }
    return formData;
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
