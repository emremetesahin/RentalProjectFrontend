import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/listModels/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiurl: string = 'https://localhost:44390/api/brands/';
  constructor(private httpClient: HttpClient) {}
  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(
      this.apiurl + 'getall'
    );
  }
  addBrand(brand: Brand):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiurl + 'add', brand);
  }
  updateBrand(brand: Brand):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiurl + 'update', brand);
  }
}

