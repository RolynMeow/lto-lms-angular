import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { User } from '../../interfaces/user';
import { Auth } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _env = environment;
  private readonly tokenKey = 'auth_token'; // Key for session storage
  private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private _auth: BehaviorSubject<Auth | null> = new BehaviorSubject<Auth | null>(null);

  constructor(
    private _http: HttpClient,
    private router: Router
  ) { }

  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  set user(user: User | null) {
    this._user.next(user);
  }

  get auth$(): Observable<Auth | null> {
    return this._auth.asObservable();
  }

  login(username: string, password: string): Observable<Auth> {
    return this._http.post<Auth>(`${this._env.url}/auth/login`, { username, password }).pipe(
      tap(auth => {
        this.setToken(auth.access_token);
        this._user.next(auth.user);
        this._auth.next(auth);
      }),
      finalize(() => this.router.navigate(['/'])) 
    );
  }

  googleLogin(token: string): Observable<Auth> {
    return this._http.post<Auth>(`${this._env.url}/auth/login/google`, { id_token:token }).pipe(
      tap(auth => {
        this.setToken(auth.access_token);
        this._user.next(auth.user);
        this._auth.next(auth);
      }),
      finalize(() => this.router.navigate(['/'])) 
    );
  }

  register(user: any): Observable<Auth> {
    return this._http.post<Auth>(`${this._env.url}/auth/register`, user).pipe(
      tap(auth => {
        this.setToken(auth.access_token);
        this._user.next(auth.user);
        this._auth.next(auth);
      }),
      finalize(() => this.router.navigate(['/'])) 
    );
  }

  googleRegister(token: string): Observable<Auth> {
    return this._http.post<Auth>(`${this._env.url}/auth/register/google`, { id_token:token }).pipe(
      tap(auth => {
        this.setToken(auth.access_token);
        this._user.next(auth.user);
        this._auth.next(auth);
      }),
      finalize(() => this.router.navigate(['/'])) 
    );
  }

  me(): Observable<{ user: User}> {
    return this._http.get<{ user: User}>(`${this._env.url}/api/auth/me`).pipe(
      tap(user => {
        this._user.next(user.user);
      }),
      catchError(err => {
        this.logout();
        return throwError(err);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this._user.next(null);
    this._auth.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Retrieve the token from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Store the token in sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Remove the token from sessionStorage
  removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

   // Check if the JWT token is expired
   private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = this.decodeToken(token);
      const expirationDate = new Date(decoded.exp * 1000); // 'exp' is in seconds
      return expirationDate < new Date();
    } catch (error) {
      return true;
    }
  }

  // Decode the JWT token
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }
}
