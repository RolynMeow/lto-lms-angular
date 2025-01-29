import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  invalidLogin: boolean = false;
  errorMessage: string = 'Username or password is incorrect';

  constructor(
    private _authService: AuthService
  ) { }

  login() {
    this._authService.login(this.userForm.value.username!, this.userForm.value.password!).subscribe(
      () => {},
      error => {
        this.invalidLogin = true;
      }
    );
  }

}
