import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";

import  {JwtPayload,JwtDecodeOptions,InvalidTokenError,JwtHeader} from "jwt-decode"
import {ToastrModule} from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { UserComponent } from './components/user/user.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { VatAddedPipe } from './components/pipes/vat-added.pipe';
import { CarFilterPipe } from './components/pipes/car-filter.pipe';
import { ColorFilterPipe } from './components/pipes/color-filter.pipe';
import { BrandFilterPipe } from './components/pipes/brand-filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CreditCardNumberPipe } from './components/pipes/credit-card-number.pipe';
import { BrandAddComponent } from './components/pages/brand-add/brand-add.component';
import { ColorAddComponent } from './components/pages/color-add/color-add.component';
import { CarAddComponent } from './components/pages/car-add/car-add.component';
import { BrandListComponent } from './components/list/brand-list/brand-list.component';
import { CarListComponent } from './components/list/car-list/car-list.component';
import { ColorListComponent } from './components/list/color-list/color-list.component';
import { BrandUpdateComponent } from './components/update-pages/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/update-pages/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-pages/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { TokenInterceptor } from './components/interceptors/token.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    RentalComponent,
    NaviComponent,
    CarComponent,
    UserComponent,
    CustomerComponent,
    CarImageComponent,
    VatAddedPipe,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    CarFilterComponent,
    PaymentComponent,
    CreditCardNumberPipe,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandListComponent,
    CarListComponent,
    ColorListComponent,
    BrandUpdateComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        positionClass:"toast-bottom-right"
      }
    ),
    

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true},{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
