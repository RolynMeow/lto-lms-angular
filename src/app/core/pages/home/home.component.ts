import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../interfaces/activity';
import { Mdule } from '../../interfaces/module';
import { QuizService } from '../../services/quiz.service';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  quizzes$!: Observable<Activity[]>;
  modules$!: Observable<Mdule[]>;

  constructor(
    private quizService: QuizService,
    private moduleService: ModuleService
  ) { 
    this.quizzes$ = this.quizService.quizzes$;
    this.modules$ = this.moduleService.modules$;
  }

  ngOnInit(): void {
    this.quizService.index().subscribe();
    this.moduleService.index().subscribe();
  }
}
