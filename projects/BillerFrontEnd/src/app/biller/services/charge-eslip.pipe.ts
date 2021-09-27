import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargeEslip'
})
export class ChargeEslipPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.eslip_no.toLocaleLowerCase().includes(args))
       || (val.bank_ref_no.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }


}
