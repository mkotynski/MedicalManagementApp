import {Injectable, OnInit} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate, OnInit {

  constructor(private ck: AuthService) {
  }

  ngOnInit() {

  }

  canActivate() {
    return AuthService.auth.loggedIn && AuthService.auth.roles.includes('patient');
  }

}

