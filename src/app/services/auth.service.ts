import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { LoginModel } from '../models/autModels/loginModel';
import { TokenDetail } from '../models/autModels/tokenDetails';
import { TokenModel } from '../models/autModels/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiurl: string = 'https://localhost:44390/api/auth/';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
          this.apiurl + 'login',loginModel)
    }
  isAuthenticated() {
    if (this.localStorageService.get('token') == null) {
      return false;
    } else {
      return true;
    }
  }
  getTokenDetail():TokenDetail
  {
    let token:any=jwtDecode(this.localStorageService.get("token"))
    let userId:number=parseInt(token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
    let email:string=(token.email)
    let expDate:number=(token.exp)
    let roles:string[]=(token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
    let tokenDetails=Object.assign({userId,email,expDate,roles})
    return tokenDetails;
  }
}
