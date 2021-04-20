import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  carImageAddForm: FormGroup;
  lastCarId: number;
  selectedFiles: File;
  urllink: string = null;
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.createImageAddForm();
    this.getCarId();
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      modelYear: ['', Validators.required],
    });
  }
  createImageAddForm() {
    this.carImageAddForm = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }
  getCarId() {
    this.carService.getCars().subscribe((response) => {
      this.lastCarId=response.data[response.data.length-1].id+1
    });
  }
  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({ id:this.lastCarId}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
        (response) => {
          this.toastr.success(response.message);
        },
        (responseError) => {
          console.log(responseError.error.ValidationErrors);
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastr.error(
              responseError.error.ValidationErrors[i].ErrorMessage
            );
          }
        }
      );

    } else {
      this.toastr.error('Formu doldurunuz');
    }
    if (this.carImageAddForm.valid) {
      this.addCarIMages();
    }
  }
  onFileSelected(event: any) {
    this.selectedFiles = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.urllink = event.target.result;
    };
  }
  addCarIMages() {
    this.carImageService
      .addImage(this.lastCarId, this.selectedFiles)
      .subscribe((response) => {this.toastr.success(response.message)});
  }
}
