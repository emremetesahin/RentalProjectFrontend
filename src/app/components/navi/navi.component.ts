import { Component, OnInit } from '@angular/core';
import { TokenDetail } from 'src/app/models/autModels/tokenDetails';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder,FormGroup,FormControl, Validators} from "@angular/forms"

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  tokenDetails:TokenDetail=null;
  authenticated:boolean;
  loginForm:FormGroup;

  constructor(private authService:AuthService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getTokenDetials();
    this.isAuthenticated();
    this.createLoginForm();
    
    
  }
  createLoginForm()
  {
    this.loginForm=this.formBuilder.group(
      {
        email:["",Validators.required],
        password:["",Validators.required]
      });
  }
  login()
  {
    console.log(this.loginForm.value)
  }
  isAuthenticated()
  {
    this.authenticated=this.authService.isAuthenticated()
  }
getTokenDetials()
{
  if(this.authenticated)
  {
  this.tokenDetails=this.authService.getTokenDetail();
  }
}
}
