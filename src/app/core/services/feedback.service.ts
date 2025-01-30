import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Feedback } from '../interfaces/feedback';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private _env = environment;
  private _feedback: BehaviorSubject<Feedback | null> = new BehaviorSubject<Feedback | null>(null);

  constructor(
    private _http: HttpClient
  ) { }

  get feedback$(): Observable<Feedback | null> {
    return this._feedback.asObservable();
  }

  store(value: any): Observable<Feedback> {
    return this._http.post<Feedback>(`${this._env.url}/api/feedback`, value).pipe(
      tap(feedback => {
        this._feedback.next(feedback);
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  } 
}
