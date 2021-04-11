import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
brandAddForm:FormGroup;
  constructor(
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService
    ) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }
  createBrandAddForm()
  {
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
  add()
  {
    if(this.brandAddForm.valid)
    {
      let brandModel=Object.assign({},this.brandAddForm.value)
      this.brandService.addBrand(brandModel).subscribe((data)=>
      {
      },dataError=>
      {
for (let i = 0; i < dataError.error.ValidationErrors.length; i++) {
  this.toastrService.error(dataError.error.ValidationErrors[i].ErrorMessage);
}
      });
    }
    else
    {
      this.toastrService.error("Formu Doldurunuz");
    }
  }

}
