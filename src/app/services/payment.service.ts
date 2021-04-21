import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/listModels/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiURL = 'https://localhost:44390/api/payments/';
  constructor(private httpClient:HttpClient) { }
  addPayment(payment:Payment)
  {
    return this.httpClient.post<ResponseModel>(this.apiURL+"add",payment);
  }
}