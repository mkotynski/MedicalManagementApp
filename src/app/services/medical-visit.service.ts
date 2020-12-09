import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../utils/request-util';
import {MedicalVisitModel} from '../model/medical-visit.model';
import {map} from 'rxjs/operators';
import {colors} from '../utils/colors';
import {CalendarEvent} from 'angular-calendar';

type EntityResponseType = HttpResponse<MedicalVisitModel>;
type EntityArrayResponseType = HttpResponse<MedicalVisitModel[]>;

@Injectable({
  providedIn: 'root'
})
export class MedicalVisitService {
  public resourceURL = SERVER_API_URL + '/api/medical-visit';

  constructor(protected http: HttpClient) {
  }

  create(medicalVisitModel: MedicalVisitModel): Observable<EntityResponseType> {
    return this.http.post<MedicalVisitModel>(this.resourceURL, medicalVisitModel, {observe: 'response'});
  }

  update(medicalVisitModel: MedicalVisitModel): Observable<EntityResponseType> {
    return this.http.put<MedicalVisitModel>(this.resourceURL, medicalVisitModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<MedicalVisitModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<MedicalVisitModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<MedicalVisitModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

  findAllByPatientId(patientId: number): Observable<CalendarEvent<{ medicalVisit: MedicalVisitModel }>[]> {
    return this.http
      .get(`${this.resourceURL}/by-patient/${patientId}`)
      .pipe(
        map(({results}: { results: MedicalVisitModel[] }) => {
          return results.map((medicalVisit: MedicalVisitModel) => {
            return {
              title: medicalVisit.name,
              start: new Date(
                medicalVisit.date
              ),
              color: colors.yellow,
              allDay: true,
              meta: {
                medicalVisit,
              },
            };
          });
        })
      );
  }

}
