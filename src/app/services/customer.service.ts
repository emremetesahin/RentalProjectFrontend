import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Customer } from '../models/listModels/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiURL = 'https://localhost:44390/api/customers/getall';
  constructor(private httpClient: HttpClient) {}
  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiURL);
  }
}
