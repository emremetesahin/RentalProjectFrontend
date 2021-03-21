import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from 'src/app/models/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44390/api/rentals/getrentalers';
  constructor(private httpclient: HttpClient) {}
  getRentals(): Observable<RentalResponseModel> {
    return this.httpclient.get<RentalResponseModel>(this.apiUrl);
  }
}
