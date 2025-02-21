import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
    comment: new FormControl('', Validators.required),
    follow_up: new FormControl(false),
  });

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) { 

  }


  ngOnInit(): void {

  }

  submit() {
    this.feedbackService.store(this.feedbackForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
