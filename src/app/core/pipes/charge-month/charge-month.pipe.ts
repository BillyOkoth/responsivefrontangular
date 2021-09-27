import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargeMonth'
})
export class ChargeMonthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
        (val.year.toLocaleLowerCase().includes(args))
        || (val.month.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
