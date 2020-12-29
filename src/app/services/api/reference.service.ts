import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../utils/request-util';
import {ReferenceModel} from '../../model/reference.model';
import {RecipeModel} from '../../model/recipe.model';

type EntityResponseType = HttpResponse<ReferenceModel>;
type EntityArrayResponseType = HttpResponse<ReferenceModel[]>;

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  public resourceURL = SERVER_API_URL + '/api/reference';

  constructor(protected http: HttpClient) {
  }

  create(referenceModel: ReferenceModel): Observable<EntityResponseType> {
    return this.http.post<ReferenceModel>(this.resourceURL, referenceModel, {observe: 'response'});
  }

  update(referenceModel: ReferenceModel): Observable<EntityResponseType> {
    return this.http.put<ReferenceModel>(this.resourceURL, referenceModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ReferenceModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<ReferenceModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ReferenceModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

  findByMedicalVisitId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ReferenceModel[]>(`${this.resourceURL}/by-visit-id/${id}`, {observe: 'response'});
  }

  findAllOfSubject(): Observable<EntityArrayResponseType> {
    return this.http.get<ReferenceModel[]>(`${this.resourceURL}/of-subject`, {observe: 'response'});
  }
}
