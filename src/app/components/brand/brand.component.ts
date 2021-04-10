import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/listModels/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  currentBrand: Brand;
  dataloaded = false;
  filterText="";
  brandModel:Brand={brandId:0,brandName:"Lamborghini"}
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataloaded = true;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;

  }
  getCurrentBrandClass(brand: Brand) {
    if (this.currentBrand != brand) {
      return 'list-group-item';
    } else {
      return 'list-group-item active';
    }
  }
  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  deleteCurrentBrand() {
    this.currentBrand =null;
  }
  addBrand()
  {
   this.brandService.addBrand(this.brandModel).subscribe((response)=>
   {
     alert(response);
   });
  }
}
