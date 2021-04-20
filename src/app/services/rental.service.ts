import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from '../models/listModels/rental';
import { RentalDetailDto } from '../models/listModels/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44390/api/rentals/';
  constructor(private httpclient: HttpClient) {}
  getRentalers(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath=this.apiUrl+"getrentaldetails";
    return this.httpclient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }
  CheckRentalable(carId:number):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+"checkreturndate?carId="+carId;
    return this.httpclient.get<ResponseModel>(newPath);
  }
  addRental(rental:Rental)
  {
    return this.httpclient.post<ResponseModel>(this.apiUrl+"add",rental);
  }
  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"getall";
    return this.httpclient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalId(rental:Rental) {
    let newPath=this.apiUrl+"getrentalid";
    return this.httpclient.post<SingleResponseModel<Rental>>(newPath,rental);
  }
}
