import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../../interfaces/activity';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../../interfaces/question';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent implements OnInit {
  quiz$!: Observable<Activity | null>;
  questionsForm!: FormGroup;
  questionIndex: number = 0
  questionLength: number = 0;

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.quiz$ = this.quizService.quiz$;
    this.questionsForm = this.fb.group({});

    this.quizService.quiz$.subscribe(quiz => {
      if (quiz) {
        quiz.questions.map(question => this.createQuestion(question));
        this.questionLength = quiz.questions.length;
        console.log(this.questionsForm)
      }
    });
  } 

  get questions(): FormGroup {
    return this.questionsForm;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.quizService.show(+id!).subscribe();
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
    console.log(this.questionsForm.value)
  }

  private createQuestion(question: Question) {
    this.questionsForm.addControl(
      question.id.toString(), new FormControl(null, Validators.required)
    );
  }

}
