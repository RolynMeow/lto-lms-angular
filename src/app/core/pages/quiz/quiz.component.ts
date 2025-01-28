import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChartOptions } from '../../../interfaces/chart-options';
import { Mdule } from '../../interfaces/module';
import { Progress } from '../../interfaces/progress';
import { ModuleService } from '../../services/module.service';
import { QuizService } from '../../services/quiz.service';
import { Activity } from '../../interfaces/activity';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  chartOptions: ChartOptions[] = [];

  quizzes$!: Observable<Activity[]>;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { 
    this.quizzes$ = this.quizService.quizzes$;
  }

  ngOnInit(): void {
    this.quizService.index().subscribe();
  }

  chartConfig(progress: Progress): ChartOptions {
    return {
      series: [progress.total_lessons, progress.completed_lessons],
      colors: ['#6c757d', '#28a745'],
      labels: ["Total", "Completed"],
      chart: {
        height: 150,
        width: 150,
        type: "donut"
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
            }
          }
        }
      },
      legend: {
        show: false
      },
      dataLabels:{
        enabled: true
      }
    }
  }

  take(id: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['quiz',id]);
    this.quizService.show(id).subscribe();
  }
}
