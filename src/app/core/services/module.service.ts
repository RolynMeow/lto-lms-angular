import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Mdule } from '../interfaces/module';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private _env = environment;
  private _modules: BehaviorSubject<Mdule[]> = new BehaviorSubject<Mdule[]>([]);
  private _module: BehaviorSubject<Mdule | null> = new BehaviorSubject<Mdule | null>(null);

  constructor(
    private _http: HttpClient
  ) { }

  get modules$(): Observable<Mdule[]> {
    return this._modules.asObservable();
  }

  get module$(): Observable<Mdule | null> {
    return this._module.asObservable();
  }

  index(): Observable<Mdule[]> {
    return this._http.get<Mdule[]>(`${this._env.url}/api/modules`).pipe(
      tap(modules => this._modules.next(modules)),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  show(id: number): Observable<Mdule> {
    return this._http.get<Mdule>(`${this._env.url}/api/modules/${id}`).pipe(
      tap(module => this._module.next(module)),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  track(id: number, duration: number): Observable<any> {
    return this._http.post(`${this._env.url}/api/lessons/track/${id}`, {
      duration: duration
    }).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    )
  }

  bookmark(id: number): Observable<{message: string, value: boolean}> {
    return this._http.post<{message: string, value: boolean}>(`${this._env.url}/api/bookmark/${id}`, {}).pipe(
      tap(bookmark => {
        this._modules.next(this._modules.getValue().map(module => module.id === id ? {...module, is_bookmarked: bookmark.value} : module));
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    )
  }

}
