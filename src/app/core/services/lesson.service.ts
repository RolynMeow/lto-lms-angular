import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private _env = environment;
  private _lessons: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  private _lesson: BehaviorSubject<Lesson | null> = new BehaviorSubject<Lesson | null>(null);

  constructor() { }

  get lessons$(): Observable<Lesson[]> {
    return this._lessons.asObservable();
  }

  get lesson$(): Observable<Lesson | null> {
    return this._lesson.asObservable();
  }

  set lessons(lessons: Lesson[]) {
    this._lessons.next(lessons);
  }

  set lesson(lesson: Lesson | null) {
    this._lesson.next(lesson);
  }

}
