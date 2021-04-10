import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { RentalAdd } from '../models/addModels/rentalAdd';
import { Rental } from '../models/listModels/rental';
import { RentalDetailDto } from '../models/listModels/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44390/api/rentals/';
  constructor(private httpclient: HttpClient) {}
  getRentalers(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath=this.apiUrl+"getrentalers";
    return this.httpclient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }
  CheckRentalable(carId:number):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+"checkreturndate?carId="+carId;
    return this.httpclient.get<ResponseModel>(newPath);
  }
  addRental(rentalAdd:RentalAdd)
  {
    return this.httpclient.post(this.apiUrl+"add",rentalAdd);
  }
  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"getall";
    return this.httpclient.get<ListResponseModel<Rental>>(newPath);
  }
}
