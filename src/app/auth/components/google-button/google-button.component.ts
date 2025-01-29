import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
declare const google: any;

@Component({
  selector: 'google-button',
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.scss'
})
export class GoogleButtonComponent implements OnInit {
  private _env = environment;
  @Input() type: string = 'login';
  @Output() response = new EventEmitter<string>();

  constructor(
    private authService: AuthService
  ) { } 

  ngOnInit(): void { 
    google.accounts.id.initialize({
      client_id: this._env.GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        if  (this.type === 'register') {
          this.authService.googleRegister(response.credential).subscribe(
            () => {},
            err => this.response.emit(err.error.error) 
          );
        } else {
          this.authService.googleLogin(response.credential).subscribe(
            () => {},
            err => this.response.emit(err.error.error) 
          );
        }
      }
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large', text: this.type === 'register' ? 'signup' : 'continue_with' }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }
}
