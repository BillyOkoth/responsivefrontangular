import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportSearch'
})
export class ReportSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.eslip_no.includes(args))
      || (val.eslip_no.toLocaleLowerCase().includes(args))
      || (val.account_no.toLocaleLowerCase().includes(args))
      || (val.bank_ref_no.toLocaleLowerCase().includes(args))
      || (val.bank_ref_no.includes(args))
      || (val.account_name.toLocaleLowerCase().includes(args))
      || (val.account_name.includes(args));
      return rVal;
    });
  }
}
