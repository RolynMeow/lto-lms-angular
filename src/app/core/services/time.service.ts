import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, Subscription, takeWhile, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {
  private startTime!: number;
  private durationInSeconds?: number; // Optional countdown duration

  private timeElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
  private timeRemaining: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  private timer$ = interval(1000); // Emits every second

  constructor() {}

  startTimer(minutes?: number): Observable<number> {
    this.startTime = Date.now();
    this.timeElapsed.next(0);

    if (minutes !== undefined) {
      this.durationInSeconds = minutes * 60;
      this.timeRemaining.next(this.durationInSeconds);
    } else {
      this.durationInSeconds = undefined;
      this.timeRemaining.next(null);
    }

    return this.timer$.pipe(
      map(() => Math.floor((Date.now() - this.startTime) / 1000)), // Elapsed time in seconds
      tap(elapsedSeconds => {
        this.timeElapsed.next(elapsedSeconds);

        if (this.durationInSeconds !== undefined) {
          const remaining = Math.max(this.durationInSeconds - elapsedSeconds, 0);
          this.timeRemaining.next(remaining);
        }
      }),
      takeWhile(elapsedSeconds => this.durationInSeconds === undefined || elapsedSeconds < this.durationInSeconds, true) // Stops if duration is set
    );
  }

  getElapsedTimeInMinutes(): Observable<number> {
    return this.timeElapsed.asObservable().pipe(
      map(seconds => Math.floor(seconds / 60)) // Convert to minutes
    );
  }

  getElapsedTimeInSeconds(): Observable<number> {
    return this.timeElapsed.asObservable();
  }

  getRemainingTimeInMinutes(): Observable<number | null> {
    return this.timeRemaining.asObservable().pipe(
      map(seconds => (seconds !== null ? Math.ceil(seconds / 60) : null)) // Convert to minutes (if applicable)
    );
  }

  getRemainingTimeInSeconds(): Observable<number | null> {
    return this.timeRemaining.asObservable();
  }
  
}
