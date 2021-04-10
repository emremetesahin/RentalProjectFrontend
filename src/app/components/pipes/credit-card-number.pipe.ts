import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardNumber'
})
export class CreditCardNumberPipe implements PipeTransform {

  transform(cardNumber: string): string {
     var arrayCardNumber=[cardNumber.slice(0,4),cardNumber.slice(4,8),cardNumber.slice(8,12),cardNumber.slice(12,16)];
     
     return arrayCardNumber.reduce((result,currentValue)=>result=result+"-"+currentValue);

  }

}
