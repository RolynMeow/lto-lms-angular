import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Activity } from '../interfaces/activity';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _env = environment;
  private _quizzes: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>([]);
  private _quiz: BehaviorSubject<Activity | null> = new BehaviorSubject<Activity | null>(null);

  constructor(
    private _http: HttpClient,
    private router: Router
  ) { }

  get quizzes$(): Observable<Activity[]> {
    return this._quizzes.asObservable();
  }

  get quiz$(): Observable<Activity | null> {
    return this._quiz.asObservable();
  }

  set quiz(quiz: Activity) {
    this._quiz.next(quiz);
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

  show(id: number): Observable<Activity> {
    return this._http.get<Activity>(`${this._env.url}/api/activities/${id}`).pipe(
      tap(quiz => this._quiz.next(quiz)),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  submit(id: number, answers: any, duration: number): Observable<any> {
    return this._http.post(`${this._env.url}/api/activities/submit/${id}`, {
      answers,
      duration
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      }),
    )

  }

}
