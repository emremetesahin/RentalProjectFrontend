import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/autModels/loginModel';
import { TokenModel } from '../models/autModels/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl: string = 'https://localhost:44390/api/auth/';
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel)
  {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiurl+"login",loginModel)
  }
  isAuthenticated()
  {
    if(localStorage.getItem("token"))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
