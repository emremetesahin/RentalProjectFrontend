import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/app/models/listModels/car';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value:Car[], filterText: string): Car[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
