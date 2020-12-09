import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../utils/request-util';
import {SpecializationModel} from '../model/specialization.model';

type EntityResponseType = HttpResponse<SpecializationModel>;
type EntityArrayResponseType = HttpResponse<SpecializationModel[]>;

@Injectable({
  providedIn: 'root'
})
export class SpecializationTypeService {
  public resourceURL = SERVER_API_URL + '/api/specialization-type';


  constructor(protected http: HttpClient) {
  }

  create(specializationModel: SpecializationModel): Observable<EntityResponseType> {
    return this.http.post<SpecializationModel>(this.resourceURL, specializationModel, {observe: 'response'});
  }

  update(specializationModel: SpecializationModel): Observable<EntityResponseType> {
    return this.http.put<SpecializationModel>(this.resourceURL, specializationModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<SpecializationModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<SpecializationModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<SpecializationModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

}
