import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModel } from 'src/app/models/carResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiURL = 'https://localhost:44390/api/cars/getcardetails';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiURL);
  }
}
