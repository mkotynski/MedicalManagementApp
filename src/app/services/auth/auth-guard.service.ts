import {Injectable, OnInit} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  constructor(private ck: AuthService) {
    console.log('INIT AuthGuard: ' + AuthService.auth.loggedIn );
  }

  ngOnInit() {

  }

  canActivate() {
    console.log('check guard: ' + AuthService.auth.loggedIn);
    return AuthService.auth.loggedIn;
  }

}
