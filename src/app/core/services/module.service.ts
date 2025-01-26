import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Mdule } from '../interfaces/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private _env = environment;
  private _modules: BehaviorSubject<Mdule[]> = new BehaviorSubject<Mdule[]>([]);

  constructor(
    private _http: HttpClient
  ) { }

  get modules$(): Observable<Mdule[]> {
    return this._modules.asObservable();
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

}
