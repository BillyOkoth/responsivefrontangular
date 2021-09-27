import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'failedAccounts'
})
export class FailedAccountsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
        (val.account_no.toLocaleLowerCase().includes(args))
        || (val.account_name.toLocaleLowerCase().includes(args))
        || (val.account_name.includes(args))
        || (val.biller_ref.toLocaleLowerCase().includes(args))
        || (val.biller_ref.includes(args))
        || (val.description.includes(args))
        || (val.description.toLocaleLowerCase().includes(args));



      return rVal;
    });
  }

}
