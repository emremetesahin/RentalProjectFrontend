import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validator, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createloginForm()
  }

  createloginForm()
  {
    this.loginForm=this.formBuilder.group({email:["",Validators.required],password:["",Validators.required]})
  }
  login()
  {
    if(this.loginForm.valid)
    {
    let loginModel=Object.assign(this.loginForm.value);
    console.log(loginModel);
    this.authService.login(loginModel).subscribe((response)=>
    {
      this.toastr.success(response.message)
    },responseError=>
    {
      this.toastr.error(responseError.error.message)
    })
    }
    else
    {
      this.toastr.info("Bilgiler eksik")
    }
  }

}
