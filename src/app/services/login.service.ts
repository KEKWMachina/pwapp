import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isAuthenticatedUser = false;
  public authStatusObserver = new BehaviorSubject(false)

  constructor(private http: HttpClient) {}

  public login(userCredentials: { name: string; password: string }): void {
    this.http
      .post('http://localhost:3000/auth/login', userCredentials)
      .pipe(catchError(this.handleLoginError))
      .subscribe((result: any) => {
        if (result.access_token) {
          this.authStatusObserver.next(true);
          this.isAuthenticatedUser = true;
        }
      });
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(() => new Error('Incorrent Credentials'));
  }
}
