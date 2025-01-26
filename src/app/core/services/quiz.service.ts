import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Activity } from '../interfaces/activity';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _env = environment;
  private _quizzes: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>([])

  constructor(
    private _http: HttpClient
  ) { }

  get quizzes$(): Observable<Activity[]> {
    return this._quizzes.asObservable();
  }

  index(): Observable<Activity[]> {
    return this._http.get<Activity[]>(`${this._env.url}/api/activities`).pipe(
      tap(quizzes => this._quizzes.next(quizzes)),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
