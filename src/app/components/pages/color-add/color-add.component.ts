import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
colorAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,private toastr:ToastrService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm()
  {
    this.colorAddForm=this.formBuilder.group(
      {
        colorName:["",Validators.required]
      }
    )
  }
  add()
  {
    if(this.colorAddForm.valid)
    {

    let colorModel=Object.assign({},this.colorAddForm.value);
    this.colorService.add(colorModel).subscribe((response)=>
    {
      this.toastr.success(response.message)
    },responseError=>{
      for (let i = 0; i <responseError.error.ValidationErrors.length; i++) {
        this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage)
      }
      console.log(responseError.error.ValidationErrors)
    })
  }
  else
  {
    this.toastr.error("Formu doldurunuz");
  }
  }

}
