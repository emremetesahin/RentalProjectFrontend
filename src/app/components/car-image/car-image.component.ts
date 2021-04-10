import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/listModels/car';
import { CarImage } from 'src/app/models/listModels/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  apiURL = 'https://localhost:44390/';
  carImages: CarImage[];
  carDetails:Car[];
  isRentable:boolean;
  buttonClick:boolean=false;
  rentDate:Date=null;
  returnDate:Date=null;
  carPrice:Number=null;
  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private carService:CarService,
    private rentalService:RentalService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["carId"])
      {
        this.getImagesByCar(params['carId']);
        this.getCarById(params['carId']);
        this.CheckRentable(params['carId']);
      }
    });
  }

  CheckRentable(carId:number)
  {
    this.rentalService.CheckRentalable(carId).subscribe((response)=>
    {
      this.isRentable=response.success;
    })

  }
  getImagesByCar(carId: number) {
    this.carImageService.getImagesByCar(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getCarById(carid:number)
  {
    this.carService.getCarsById(carid).subscribe((response)=>
    {
      this.carDetails=response.data;
      this.carPrice=response.data[0]["dailyPrice"]
    })
  }
  getSliderClassName(index:number)
  {
    if(index==0)
    {
      return "carousel-item active";
    }
    else{ return "carousel-item"}
  }
  goPaymentPage()
  {
    this.buttonClick=true;
  }

}
