import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from 'src/app/models/listModels/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[], filterText: string): Brand[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText?value.filter((b)=>b.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
