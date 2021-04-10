import { NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";

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

import {ToastrModule} from "ngx-toastr";

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass:"toast-bottom-right"
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
