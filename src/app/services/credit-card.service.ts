import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/listModels/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiURL = 'https://localhost:44390/api/';
  constructor(private httpClient:HttpClient) { }
  getCreditCards(userId:Number):Observable<ListResponseModel<CreditCard>>
  {
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiURL+"creditcards/getbyuserid?userId="+userId)
  }
  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiURL+"creditcards/add",creditCard)
  }

  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiURL+"creditcards/delete",creditCard)
  }
}
