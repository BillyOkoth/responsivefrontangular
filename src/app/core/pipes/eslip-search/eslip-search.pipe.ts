import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eslipSearch'
})
export class EslipSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.eslip_no.includes(args))
      || (val.eslip_no.toLocaleLowerCase().includes(args))
      || (val.created_at.toLocaleLowerCase().includes(args))
      || (val.amount_to_pay.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
