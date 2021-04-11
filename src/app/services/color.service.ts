import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Color } from 'src/app/models/listModels/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiURL = 'https://localhost:44390/api/colors/';
  constructor(private httpClient: HttpClient) {}
  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiURL+"getall");
  }
  add(color:Color):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiURL+"add",color);
  }
  update(color:Color):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(this.apiURL+"update",color);
  }
}
