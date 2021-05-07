import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private localStorage:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isAuthenticated())
    {
      let now=parseInt(Date.now().toString().substring(0,Date.now().toString().length-3));
      let tokenDate=this.authService.getTokenDetail().expDate
      let dateDiff=tokenDate-now;
     if(tokenDate!=null&&dateDiff<=0)
     {
       this.localStorage.remove("token");
     }
    }
    return next.handle(request);
  }
}
