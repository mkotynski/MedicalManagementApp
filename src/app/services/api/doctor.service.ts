import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../utils/request-util';
import {DoctorModel} from '../../model/doctor.model';
import {PatientModel} from '../../model/patient.model';

type EntityResponseType = HttpResponse<DoctorModel>;
type EntityArrayResponseType = HttpResponse<DoctorModel[]>;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  public resourceURL = SERVER_API_URL + '/api/doctor';


  constructor(protected http: HttpClient) {
  }

  create(doctorModel: DoctorModel): Observable<EntityResponseType> {
    return this.http.post<DoctorModel>(this.resourceURL, doctorModel, {observe: 'response'});
  }

  update(doctorModel: DoctorModel): Observable<EntityResponseType> {
    return this.http.put<DoctorModel>(this.resourceURL, doctorModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<DoctorModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<DoctorModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<DoctorModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

  findLogged(): Observable<EntityResponseType> {
    return this.http.get<PatientModel>(`${this.resourceURL}/logged`, {observe: 'response'});
  }

}
