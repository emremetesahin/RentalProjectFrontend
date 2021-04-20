import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDetailDto } from '../models/userDetailDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44390/api/users/';
  constructor(private httpClient:HttpClient) { }
  getUserDetailsByMail(email:String):Observable<ListResponseModel<UserDetailDto>>
  {
    return this.httpClient.get<ListResponseModel<UserDetailDto>>(this.apiUrl+"getdetailsbymail?mail="+email)
  }
}
