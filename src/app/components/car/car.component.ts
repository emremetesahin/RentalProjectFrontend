import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/listModels/brand';
import { Car } from 'src/app/models/listModels/car';
import { Color } from 'src/app/models/listModels/color';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[];
  colors:Color[];
  brands:Brand[];
  dataLoaded = false;
  currentCar:Car;
  filterText="";
  selectedBrand="";

    constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private localStorage:LocalStorageService,
    private authService:AuthService


  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["brandName"]&&params["colorName"])
      {
        this.getCarsByBrandAndColor(params['brandName'],params['colorName']);
      
      }
      else if (params["brandName"]) {
        this.getCarsByBrand(params['brandName']);
      }
    
      else if(params["colorName"]){
        this.getCarsByColor(params['colorName']);

      }
       else {
        this.getCars();
        this.getCars();

      }
    });
    
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandName: string) {
    this.carService.getCarsByBrandName(brandName).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorName:string)
  {
    this.carService.getCarsByColorName(colorName).subscribe((response)=>
    {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByBrandAndColor(brandName:string,colorName:string)
  {
this.carService.getCarsByBrandAndColorName(brandName,colorName).subscribe((response)=>
{
  this.cars=response.data;
  this.dataLoaded=true;
})
  }

  setCurrentCar(car:Car)
  {
    this.currentCar=car;
  }

  getCurrentCarClass(car:Car)
  {
    if(this.currentCar==car)
    {
      return 'table-active'
    }
    else{
      return 'table'
    }
  }

}
