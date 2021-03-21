import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from 'src/app/models/customerResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiURL = 'https://localhost:44390/api/customers/getall';
  constructor(private httpClient: HttpClient) {}
  getCustomers(): Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.apiURL);
  }
}
