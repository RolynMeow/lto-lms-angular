import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Badge, User } from '../../../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ActivityHistory } from '../../../interfaces/activity-history';
import { BookmarkHistory } from '../../../interfaces/bookmark';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _env = environment;
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _badges: BehaviorSubject<Badge[]> = new BehaviorSubject<Badge[]>([]);
  private _activityHistory: BehaviorSubject<ActivityHistory[]> = new BehaviorSubject<ActivityHistory[]>([]);
  private _bookmarks: BehaviorSubject<BookmarkHistory[]> = new BehaviorSubject<BookmarkHistory[]>([]);

  constructor(
    private _http: HttpClient
  ) { }

  get users$() {
    return this._users.asObservable();
  }

  get badges$() {
    return this._badges.asObservable();
  }

  get activityHistory$() {
    return this._activityHistory.asObservable();
  }

  get bookmarks$() {
    return this._bookmarks.asObservable();
  }

  index(): Observable<User[]> {
    return this._http.get<User[]>(`${this._env.url}/api/user`).pipe(
      tap(users => this._users.next(users)),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    )
  }

  update(id: number, value: any): Observable<User> {
    value.id = id;
    return this._http.put<User>(`${this._env.url}/api/user/update`, value).pipe(
      tap((res) => {
        this._users.next(this._users.getValue().map(u => u.id === res.id ? res : u));
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  delete(id: number): Observable<User> {
    return this._http.delete<User>(`${this._env.url}/api/user/${id}`).pipe(
      tap((res) => {
        this._users.next(this._users.getValue().filter(u => u.id !== id));
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  badges(id: number): Observable<Badge[]> {
    return this._http.get<Badge[]>(`${this._env.url}/api/user/achievements`, {
      params: { id: id }
    }).pipe(
      tap((res) => {
        this._badges.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  activityHistory(id: number): Observable<ActivityHistory[]> {
    return this._http.get<ActivityHistory[]>(`${this._env.url}/api/activity-history`, {
      params: { id: id }
    }).pipe(
      tap((res) => {
        this._activityHistory.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  bookmarks(id: number): Observable<BookmarkHistory[]> {
    return this._http.get<BookmarkHistory[]>(`${this._env.url}/api/bookmark`,
      {
        params: { id: id }
      }
    ).pipe(
      tap((res) => {
        this._bookmarks.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
