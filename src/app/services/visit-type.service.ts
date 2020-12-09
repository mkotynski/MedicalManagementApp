import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../utils/request-util';
import {VisitTypeModel} from '../model/visit-type.model';

type EntityResponseType = HttpResponse<VisitTypeModel>;
type EntityArrayResponseType = HttpResponse<VisitTypeModel[]>;

@Injectable({
  providedIn: 'root'
})
export class VisitTypeService {
  public resourceURL = SERVER_API_URL + '/api/visit-type';


  constructor(protected http: HttpClient) {
  }

  create(visitTypeModel: VisitTypeModel): Observable<EntityResponseType> {
    return this.http.post<VisitTypeModel>(this.resourceURL, visitTypeModel, {observe: 'response'});
  }

  update(visitTypeModel: VisitTypeModel): Observable<EntityResponseType> {
    return this.http.put<VisitTypeModel>(this.resourceURL, visitTypeModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<VisitTypeModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<VisitTypeModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<VisitTypeModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

}
