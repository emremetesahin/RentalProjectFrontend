import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/listModels/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  filterText="";

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }
  getCurrentColorClass(color: Color) {
    if (this.currentColor != color) {
      return 'list-group-item';
    } else {
      return 'list-group-item active';
    }
  }
  getAllColorClass() {
    if (this.currentColor) {
      return 'list-group-item';
    }
    else
    {
      return "list-group-item active"
    }
  }
  deleteCurrentColor()
  {
    this.currentColor=null
  }
}
