import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/app/models/listModels/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value:Color[], filterText:string): Color[]{
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText?value.filter((c)=>c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
