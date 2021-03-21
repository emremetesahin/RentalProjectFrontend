import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataloaded = false;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataloaded = true;
    });
  }
}
