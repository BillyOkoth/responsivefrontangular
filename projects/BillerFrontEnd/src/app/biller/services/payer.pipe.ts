import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payer'
})
export class PayerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.account_no.toLocaleLowerCase().includes(args))
      || (val.company_name.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }



}
