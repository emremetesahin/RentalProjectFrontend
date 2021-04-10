import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/listModels/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
rentals:RentalDetailDto[]=[];
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalers();
  }
  getRentalers()
  {
    this.rentalService.getRentalers().subscribe((response)=>
    {
      this.rentals=response.data;
    });
  }

}
