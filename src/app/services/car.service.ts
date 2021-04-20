import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/listModels/car';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiURL = 'https://localhost:44390/api/';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsById(carId:number):Observable<SingleResponseModel<Car>>
  {
    let newPath=this.apiURL+"cars/getbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getCarsByBrandName(brandName:string):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiURL+"cars/getcardetailsbybrandname?brandName="+brandName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorName(colorName:string):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiURL+"cars/getcardetailsbycolorname?colorName="+colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandAndColorName(brandName:string,colorName:string):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiURL+"cars/getcardetailsbybrandnameandcolorname?brandName="+brandName+"&colorName="+colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  addCar(car:Car):Observable<ResponseModel>
  {
let newPath=this.apiURL+"cars/add";
return this.httpClient.post<ResponseModel>(newPath,car);
  }
}