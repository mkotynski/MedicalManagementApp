import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../utils/request-util';
import {AvailableDateModel} from '../model/available-date.model';
import {CalendarEvent} from 'angular-calendar';
import {map} from 'rxjs/operators';
import {colors} from '../utils/colors';
import {DateManagerService} from './date-manager.service';
import {endOfDay, startOfDay,} from 'date-fns';

type EntityResponseType = HttpResponse<AvailableDateModel>;
type EntityArrayResponseType = HttpResponse<AvailableDateModel[]>;

@Injectable({
  providedIn: 'root'
})
export class AvailableDateService {
  public resourceURL = SERVER_API_URL + '/api/available-date';


  constructor(protected http: HttpClient,
              private  dateManagerService: DateManagerService) {
  }

  create(availableDateModel: AvailableDateModel): Observable<EntityResponseType> {
    return this.http.post<AvailableDateModel>(this.resourceURL, availableDateModel, {observe: 'response'});
  }

  update(availableDateModel: AvailableDateModel): Observable<EntityResponseType> {
    return this.http.put<AvailableDateModel>(this.resourceURL, availableDateModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<AvailableDateModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<AvailableDateModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<AvailableDateModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

  findAllByDoctorId(doctorId: number): Observable<CalendarEvent<{ availableDateModel: AvailableDateModel }>[]> {
    return this.http
      .get(`${this.resourceURL}/by-doctor/${doctorId}`)
      .pipe(
        map(({results}: { results: AvailableDateModel[] }) => {
          return results.map((availableDateModel: AvailableDateModel) => {
            return {
              title: availableDateModel.doctor.name + ' ' + availableDateModel.doctor.surname,
              start: new Date(this.dateManagerService.parseDate(availableDateModel.date)),
              end:  new Date(this.dateManagerService.parseDate(availableDateModel.endDate)),
              color: this.dateManagerService.returnEventColor(availableDateModel.reserved),
              meta: {
                availableDateModel,
              },
            };
          });
        })
      );
  }

}
