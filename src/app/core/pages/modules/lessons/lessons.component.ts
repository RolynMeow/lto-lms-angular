import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mdule } from '../../../interfaces/module';
import { ModuleService } from '../../../services/module.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Lesson } from '../../../interfaces/lesson';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LessonsComponent implements OnInit {
  module$!: Observable<Mdule | null>;
  lesson$!: Observable<Lesson| null>;
  lessons: Lesson[] = [];
  index!: number;

  constructor(
    private moduleService: ModuleService,
    private activatedRoute: ActivatedRoute,
    private canvas: NgbOffcanvas,
    private lessonService: LessonService
  ) { 
    this.module$ = this.moduleService.module$;
    this.lesson$ = this.lessonService.lesson$;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.moduleService.show(+id!).subscribe();
  }

  view(lesson: Lesson, template: TemplateRef<any>) {
    this.lessonService.lesson = lesson;
    this.canvas.open(template, { position: 'end' });
  }

  next() {
    this.index++;
    this.lessonService.lesson = this.lessons[this.index];
    this.checker();
  }

  previous() {
    this.index--;
    this.lessonService.lesson = this.lessons[this.index];
    this.checker();
  }

  checker() {
    if (!this.lessons[this.index]) {
      this.canvas.dismiss();
    }
  }

}
