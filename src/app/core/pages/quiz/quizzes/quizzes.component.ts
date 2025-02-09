import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Activity } from '../../../interfaces/activity';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../../interfaces/question';
import Swal from 'sweetalert2';
import { TimeServiceService } from '../../../services/time.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent implements OnInit, OnDestroy {
  private timerSubscription!: Subscription;
  quiz$!: Observable<Activity | null>;
  elapsedMinutes!: Observable<number>;
  remainingMinutes!: Observable<number | null>;

  questionsForm!: FormGroup;
  questionIndex: number = 0
  questionLength: number = 0;
  id: number = 0;
  duration: number = 0;

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private timeService: TimeServiceService,
    private router: Router
  ) { 
    this.quiz$ = this.quizService.quiz$;
    this.elapsedMinutes = this.timeService.getElapsedTimeInMinutes();
    this.remainingMinutes = this.timeService.getRemainingTimeInMinutes();
    this.timeService.getElapsedTimeInMinutes().subscribe(minutes => this.duration = minutes);

    this.questionsForm = this.fb.group({});

    this.quizService.quiz$.subscribe(quiz => {
      if (quiz) {
        quiz.questions.map(question => this.createQuestion(question));
        this.questionLength = quiz.questions.length;
      }
    });
  } 

  get questions(): FormGroup {
    return this.questionsForm;
  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.quizService.show(this.id).subscribe(() => {
      this.timerSubscription = this.timeService.startTimer(this.id === 3 ? 11 : undefined).subscribe(res => 
        {
          if (this.id === 3) {
            this.timeService.getRemainingTimeInMinutes().subscribe(minutes => {
              if (minutes === 0) {
                this.questionsForm.disable();
                this.quizService.submit(this.id, this.questionsForm.value, this.duration).subscribe();
                Swal.fire({
                  title: "It looks like you've run out of time. If you still can't get the correct answers, you can always come back later!",
                  icon: 'warning',
                  confirmButtonText: 'Try Again',
                  showDenyButton: false,
                  allowEscapeKey: false,
                  allowOutsideClick: false
                }).then(result => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/quiz']);
                    Swal.close();
                  }
                });
              }
            });
          }
        }
      );
    });

    
  }

  select(index: number) {
    this.questionIndex = index;
  }

  prev() {
    const count = this.questionIndex + 1;
    if (count !== 1) {
      this.questionIndex--;
    }
  }

  next() {
    const count = this.questionIndex + 1;
    if (count !== this.questionLength) {
      this.questionIndex++;
    }
  }

  submit() {
    if (this.questionsForm.invalid) {
      Swal.fire({
        title: "Are you sure? It looks like some questions haven't been answered yet.",
        icon: 'warning',
        confirmButtonText: 'Submit',
        showDenyButton: true,
        denyButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
          this.quizService.submit(this.id, this.questionsForm.value, this.duration).subscribe(
            () => {
              this.router.navigate(['/quiz']);
            }
          );
          Swal.close();
        } else {
          Swal.close();
        }
      });
    } else {
      this.quizService.submit(this.id, this.questionsForm.value, this.duration).subscribe(
        () => {
          this.router.navigate(['/quiz']);
        }
      );
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Clean up the subscription
    }
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe(); // Clean up the subscription
  }

  private createQuestion(question: Question) {
    this.questionsForm.addControl(
      question.id.toString(), new FormControl(null, Validators.required)
    );
  }

}
