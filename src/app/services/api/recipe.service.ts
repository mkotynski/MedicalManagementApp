import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../utils/request-util';
import {RecipeModel} from '../../model/recipe.model';
import {ReferenceModel} from '../../model/reference.model';

type EntityResponseType = HttpResponse<RecipeModel>;
type EntityArrayResponseType = HttpResponse<RecipeModel[]>;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public resourceURL = SERVER_API_URL + '/api/recipe';

  constructor(protected http: HttpClient) {
  }

  create(recipeModel: RecipeModel): Observable<EntityResponseType> {
    return this.http.post<RecipeModel>(this.resourceURL, recipeModel, {observe: 'response'});
  }

  update(recipeModel: RecipeModel): Observable<EntityResponseType> {
    return this.http.put<RecipeModel>(this.resourceURL, recipeModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<RecipeModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<RecipeModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<RecipeModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

  findByMedicalVisitId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<RecipeModel[]>(`${this.resourceURL}/by-visit-id/${id}`, {observe: 'response'});
  }

  findAllOfSubject(): Observable<EntityArrayResponseType> {
  return this.http.get<RecipeModel[]>(`${this.resourceURL}/of-subject`, {observe: 'response'});
}
}
