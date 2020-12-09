import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../utils/request-util';
import {PatientModel} from '../model/patient.model';

type EntityResponseType = HttpResponse<PatientModel>;
type EntityArrayResponseType = HttpResponse<PatientModel[]>;

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public resourceURL = SERVER_API_URL + '/api/patient';


  constructor(protected http: HttpClient) {
  }

  create(patientModel: PatientModel): Observable<EntityResponseType> {
    return this.http.post<PatientModel>(this.resourceURL, patientModel, {observe: 'response'});
  }

  update(patientModel: PatientModel): Observable<EntityResponseType> {
    return this.http.put<PatientModel>(this.resourceURL, patientModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<PatientModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<PatientModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<PatientModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

}
