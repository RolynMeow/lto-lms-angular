import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, Subscription, takeWhile, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {
  private startTime!: number;
  private timeElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
  private timer$ = interval(1000); // Emits every second

  constructor() {
    this.startTime = Date.now();
  }

  startTimer(): Observable<number> {
    return this.timer$.pipe(
      map(() => Math.floor((Date.now() - this.startTime) / 1000)), // Update elapsed time in seconds
      tap(res => this.timeElapsed.next(res))
    );
  }

  getElapsedTimeInMinutes(): Observable<number> {
    return this.timeElapsed.asObservable().pipe(
      map(seconds => Math.floor(seconds / 60)) // Convert seconds to minutes
    );
  }

  getElapsedTimeInSeconds(): Observable<number> {
    return this.timeElapsed.asObservable();
  }
  
}
