import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {SERVER_API_URL} from '../../app.constants';
import {AuthService} from './auth.service';

/**
 * The Role Service service
 */
@Injectable()
export class RolesService {
  public resourceURL = SERVER_API_URL + '/api/roles';

  constructor(
    private http: HttpClient
  ){}

  /**
   * gets the user role
   */
  public roles(): string[] {
    //return this.http.get<{roles: string[]}>(this.resourceURL);
    return AuthService.auth.roles;
  }
}
