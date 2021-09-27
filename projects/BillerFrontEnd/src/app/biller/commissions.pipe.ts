import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commissions'
})
export class CommissionsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =
       (val.payer_name.includes(args))
        || (val.payer_name.toLocaleLowerCase().includes(args));




      return rVal;
    });

  }

}
