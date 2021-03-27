import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  apiURL = 'https://localhost:44390/';

  carImages: CarImage[];
  carDetails:Car[];
  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private carService:CarService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["carId"])
      {
        this.getImagesByCar(params['carId']);
        this.getCarById(params['carId']);
      }
    });
  }
  getImagesByCar(carId: number) {
    this.carImageService.getImagesByCar(carId).subscribe((response) => {
      this.carImages = response.data;
      if(response.data[0]["imagePath"]==null)
      {
        this.carImages[0]["imagePath"]=this.apiURL+response.data[0]["imagePath"];
      }
    });
  }
  getCarById(carid:number)
  {
    this.carService.getCarsById(carid).subscribe((response)=>
    {
      this.carDetails=response.data;
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

}
