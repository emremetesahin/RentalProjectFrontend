import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentAdd } from '../models/addModels/paymentAdd';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiURL = 'https://localhost:44390/api/payments/';
  constructor(private httpClient:HttpClient) { }
  addPayment(paymentAdd:PaymentAdd)
  {
    return this.httpClient.post(this.apiURL+"add",paymentAdd);
  }
}