import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEslip'
})
export class SearchEslipPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {

      const rVal = (val.eslip_no.toLocaleLowerCase().includes(args))
       || (val.status.toLocaleLowerCase().includes(args))
       || (val.accounts.toLocaleLowerCase().includes(args))
       || (val.amount_to_pay.toLocaleLowerCase().includes(args))
       || (val.created_at.toLocaleLowerCase().includes(args));
      return rVal;
    });

  }
}
