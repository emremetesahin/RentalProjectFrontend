import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/listModels/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  newColor:Color={colorId:0,colorName:null}

  constructor(private colorService:ColorService,private toaster:ToastrService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>
    {
      this.newColor.colorId=Number(params['colorId'])
    })

  }
  update()
  {
this.colorService.update(this.newColor).subscribe((response)=>
{
  this.toaster.success(response.message)
})
  }

}
