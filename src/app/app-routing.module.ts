import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",pathMatch:"full",component:CarComponent},
  {path:"details/:carId",pathMatch:"full",component:CarImageComponent},
  {path:"brand/:brandName",pathMatch:"full",component:CarComponent},
  {path:"color/:colorName",pathMatch:"full",component:CarComponent},
  {path:"cars/brand/:brandName/color/:colorName",pathMatch:"full",component:CarComponent},
  {path:"payment/:carId",component:PaymentComponent}
  ]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
