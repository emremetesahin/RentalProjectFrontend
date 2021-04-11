import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/listModels/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
apiURL="https://localhost:44390/api"
  constructor(private httpClient:HttpClient) { }
  getImagesByCar(carId:number):Observable<ListResponseModel<CarImage>>
  {
    let newPath=this.apiURL+"/carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  addImage(carId:any,file:any):Observable<ResponseModel>
  {
    let newPath=this.apiURL+"/carimages/add";
    const uploadData=new FormData()
    uploadData.append('carId',carId);
    uploadData.append('image',file);
    console.log(uploadData);
    return this.httpClient.post<ResponseModel>(newPath,uploadData)
  }
}
