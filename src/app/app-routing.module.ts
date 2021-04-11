import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { LoginGuard } from './components/guards/login.guard';
import { BrandListComponent } from './components/list/brand-list/brand-list.component';
import { CarListComponent } from './components/list/car-list/car-list.component';
import { ColorListComponent } from './components/list/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { BrandAddComponent } from './components/pages/brand-add/brand-add.component';
import { CarAddComponent } from './components/pages/car-add/car-add.component';
import { ColorAddComponent } from './components/pages/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandUpdateComponent } from './components/update-pages/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/update-pages/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-pages/color-update/color-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",pathMatch:"full",component:CarComponent},
  {path:"details/:carId",pathMatch:"full",component:CarImageComponent},
  {path:"brand/:brandName",pathMatch:"full",component:CarComponent},
  {path:"color/:colorName",pathMatch:"full",component:CarComponent},
  {path:"cars/brand/:brandName/color/:colorName",pathMatch:"full",component:CarComponent},
  {path:"payment/:carId",component:PaymentComponent},
  {path:"add/brand",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"add/color",component:ColorAddComponent},
  {path:"add/car",component:CarAddComponent},
  {path:"list/car",component:CarListComponent},
  {path:"list/color",component:ColorListComponent},
  {path:"list/brand",component:BrandListComponent},
  {path:"update/car/:carId",component:CarUpdateComponent},
  {path:"update/color/:colorId",component:ColorUpdateComponent},
  {path:"update/brand/:brandId",component:BrandUpdateComponent},
  {path:"login",component:LoginComponent}
  ]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
