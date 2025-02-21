import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mdule } from '../../../interfaces/module';
import { ModuleService } from '../../../services/module.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Lesson } from '../../../interfaces/lesson';
import { LessonService } from '../../../services/lesson.service';
import { TimeServiceService } from '../../../services/time.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LessonsComponent implements OnInit {
  private timerSubscription!: Subscription;
  module$!: Observable<Mdule | null>;
  lesson$!: Observable<Lesson| null>;
  lessons: Lesson[] = [];
  index!: number;
  seconds: number = 0;

  constructor(
    private moduleService: ModuleService,
    private activatedRoute: ActivatedRoute,
    private canvas: NgbOffcanvas,
    private lessonService: LessonService,
    private timeService: TimeServiceService
  ) { 
    this.module$ = this.moduleService.module$;
    this.lesson$ = this.lessonService.lesson$;
    this.timeService.getElapsedTimeInSeconds().subscribe(
      seconds => this.seconds = seconds
    )
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.moduleService.show(+id!).subscribe();
  }

  view(lesson: Lesson, template: TemplateRef<any>, index: number, lessons: Lesson[]) {
    this.lessons = lessons;
    this.index = index;
    this.lessonService.lesson = lesson;
    this.canvas.open(template, { position: 'end' });
    this.timerSubscription = this.timeService.startTimer().subscribe();
  }

  next() {
    console.log(this.index);
    this.track();
    this.timerSubscription = this.timeService.startTimer().subscribe();

    this.index++;
    this.lessonService.lesson = this.lessons[this.index];
    this.checker();
  }

  previous() {
    this.track();
    this.timerSubscription = this.timeService.startTimer().subscribe();

    this.index--;
    this.lessonService.lesson = this.lessons[this.index];
    this.checker();
  }

  checker() {
    if (!this.lessons[this.index]) {
      this.canvas.dismiss();
      this.timerSubscription.unsubscribe();
    }
  }

  track() {
    this.timerSubscription.unsubscribe();
    const lesson = this.lessons[this.index];
    this.moduleService.track(lesson.id, this.seconds).subscribe(res => this.moduleService.index().subscribe());
  }

}
