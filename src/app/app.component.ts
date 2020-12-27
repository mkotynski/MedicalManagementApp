import { Component } from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mmf-app';
  constructor(private auth: AuthService) {
    console.log(auth.getParsedToken());
  }

  logout() {
    this.auth.logout();
  }
}
