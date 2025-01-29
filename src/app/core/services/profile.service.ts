import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Engagement, Rank, TimeData } from '../interfaces/rank';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Bookmark, User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { ActivityHistory } from '../interfaces/activity-history';
import { BookmarkHistory } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _env = environment;
  private _rank: BehaviorSubject<Rank | null> = new BehaviorSubject<Rank | null>(null);
  private _engagement: BehaviorSubject<Engagement | null> = new BehaviorSubject<Engagement | null>(null);
  private _timeData: BehaviorSubject<TimeData | null> = new BehaviorSubject<TimeData | null>(null);
  private _activityHistory: BehaviorSubject<ActivityHistory[]> = new BehaviorSubject<ActivityHistory[]>([]);
  private _bookmarks: BehaviorSubject<BookmarkHistory[]> = new BehaviorSubject<BookmarkHistory[]>([]);

  get rank(): Rank | null {
    return this._rank.value;
  }

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  get rank$(): Observable<Rank | null> {
    return this._rank.asObservable();
  }

  get engagement$(): Observable<Engagement | null> {
    return this._engagement.asObservable();
  }

  get timeData$(): Observable<TimeData | null> {  
    return this._timeData.asObservable();  
  }

  get activityHistory$(): Observable<ActivityHistory[]> {
    return this._activityHistory.asObservable();
  }

  get bookmarks$(): Observable<BookmarkHistory[]> {
    return this._bookmarks.asObservable();
  }

  leaderboard(): Observable<Rank> {
    return this._http.get<Rank>(`${this._env.url}/api/activity-history/leaderboards`).pipe(
      tap((res) => {
        this._rank.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  engagement(): Observable<Engagement> {
    return this._http.get<Engagement>(`${this._env.url}/api/activity-history/engagements`).pipe(
      tap((res) => {
        this._engagement.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  timeData(): Observable<TimeData> {
    return this._http.get<TimeData>(`${this._env.url}/api/activity-history/getTotalModuleHours`).pipe(
      tap((res) => {
        this._timeData.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  update(value: any): Observable<User> {
    return this._http.put<User>(`${this._env.url}/api/user/update`, value).pipe(
      tap((res) => {
        this._authService.user = res;
      }),
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message
        });
        return throwError(err);
      })
    );  
  }

  activityHistory(): Observable<ActivityHistory[]> {
    return this._http.get<ActivityHistory[]>(`${this._env.url}/api/activity-history`).pipe(
      tap((res) => {
        this._activityHistory.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  bookmarks(): Observable<BookmarkHistory[]> {
    return this._http.get<BookmarkHistory[]>(`${this._env.url}/api/bookmark`).pipe(
      tap((res) => {
        this._bookmarks.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
