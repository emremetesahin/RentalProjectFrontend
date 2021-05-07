import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.createloginForm();
  }

  createloginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign(this.loginForm.value);
      console.log(loginModel);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastr.success(response.message);
          if (response.success) {
            this.localStorageService.set('token', response.data.token);
            console.log(this.authService.getTokenDetail())
            this.router.navigate(['cars']);
          }
        },
        (responseError) => {
          this.toastr.error(responseError.error.message);
        }
      );
    } else {
      this.toastr.info('Bilgiler eksik');
    }
  }
}
