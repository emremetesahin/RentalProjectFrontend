import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/listModels/car';
import { CarImage } from 'src/app/models/listModels/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  apiURL = 'https://localhost:44390/';
  carDetails: Car = null;
  dataLoaded: boolean = false;
  carImages: CarImage[];
  rentDatesForm: FormGroup;
  carId: number;
  rentable: boolean;
  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = parseInt(params['carId']);
    });
    this.getCarDetailsById(this.carId);
    this.getCarImagesById(this.carId);
    this.createFormBuilder();
    this.checkRentable();
  }
  checkRentable() {
    this.rentalService.CheckRentalable(this.carId).subscribe((response) => {
      this.rentable = response.success;
    });
  }
  createFormBuilder() {
    this.rentDatesForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
    });
  }
  getCarDetailsById(carId: number) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      console.log(response.data);
      this.dataLoaded = true;
    });
  }
  getCarImagesById(carId: number) {
    this.carImageService.getImagesByCar(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  sliderActiveItemClass(index: number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  addRental() {
    if (this.rentDatesForm.valid) {
      if (this.authService.isAuthenticated() == true) {
        console.log('Giriş Yapılmış');
        let customerIdfromToken = this.authService.getTokenDetail().userId;
        let rentalModel = Object.assign(
          { carId: this.carId, customerId: customerIdfromToken,price:this.CalculateRentPrice() },
          this.rentDatesForm.value
        );
        console.log(rentalModel);
        this.rentalService.addRental(rentalModel).subscribe((response) => {
          this.toastr.success(response.message);
          this.rentalService
            .getRentalId(rentalModel)
            .subscribe((responseData) => {
              console.log(responseData.data.id);
              this.router.navigate([
                'rental/' + responseData.data.id + '/payment',
              ]);
            });
        });
      } else {
        this.toastr.warning('Lütfen giriş yapınız');
        this.router.navigate(['login']);
      }
    } else {
      this.toastr.warning('Lütfen Kiralama Tarihini giriniz');
    }
    
  }
  CalculateRentPrice()
  {
    let rentDate=new Date(this.rentDatesForm.value.rentDate)
    let returnDate=new Date(this.rentDatesForm.value.returnDate)
    return(returnDate.getDate()-rentDate.getDate())*this.carDetails.dailyPrice;
  }
}
