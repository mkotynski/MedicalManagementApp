import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class AuthService {
  static auth: any = {};
  static currentUserDetails: any = {};

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const keycloakAuth = Keycloak('assets/keycloak/keycloak.json');
      keycloakAuth.init({onLoad: 'login-required'})
        .success(() => {
          AuthService.auth.loggedIn = true;
          AuthService.auth.keycloak = keycloakAuth;
          AuthService.auth.logoutUrl = keycloakAuth.authServerUrl
            + 'realms/MFMS/protocol/openid-connect/logout?redirect_uri='
            + document.baseURI;
          AuthService.auth.roles = keycloakAuth.realmAccess.roles;
          AuthService.auth.currentUserDetails = AuthService.auth.keycloak.loadUserProfile();
          console.log(AuthService.auth);
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (AuthService.auth.keycloak.token) {
        AuthService.auth.keycloak
          .updateToken(60)
          .success((refreshed) => {
            console.log('refreshed ' + refreshed);
            resolve(AuthService.auth.keycloak.token as string);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
  }

  getParsedToken() {
    return AuthService.auth.keycloak.tokenParsed;
  }

  logout() {
    console.log('*** LOGOUT');
    AuthService.auth.loggedIn = false;
    AuthService.auth.authz = null;
    window.location.href = AuthService.auth.logoutUrl;
  }
}
