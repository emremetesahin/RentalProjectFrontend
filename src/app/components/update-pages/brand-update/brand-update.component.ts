import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/listModels/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  newBrand: Brand={brandId:0,brandName:null};
  constructor(private activedRoute: ActivatedRoute,private brandService:BrandService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params)=>
    {
      this.newBrand.brandId=Number(params['brandId'])}
  
    )}
  update() {
    
    this.brandService.updateBrand(this.newBrand).subscribe((response)=>
    {
      
      this.toastr.success(response.message)
    });
  }
}
