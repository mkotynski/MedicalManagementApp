import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../utils/request-util';
import {ReceiptModel} from '../../model/receipt.model';
import {ReferenceModel} from '../../model/reference.model';

type EntityResponseType = HttpResponse<ReceiptModel>;
type EntityArrayResponseType = HttpResponse<ReceiptModel[]>;

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  public resourceURL = SERVER_API_URL + '/api/receipt';

  constructor(protected http: HttpClient) {
  }

  create(receiptModel: ReceiptModel): Observable<EntityResponseType> {
    return this.http.post<ReceiptModel>(this.resourceURL, receiptModel, {observe: 'response'});
  }

  update(receiptModel: ReceiptModel): Observable<EntityResponseType> {
    return this.http.put<ReceiptModel>(this.resourceURL, receiptModel, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ReceiptModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<EntityResponseType> {
    return this.http.delete<ReceiptModel>(`${this.resourceURL}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ReceiptModel[]>(this.resourceURL, {params: options, observe: 'response'});
  }

  findByMedicalVisitId(id: number): Observable<EntityResponseType> {
    return this.http.get<ReceiptModel>(`${this.resourceURL}/by-visit-id/${id}`, {observe: 'response'});
  }
}
