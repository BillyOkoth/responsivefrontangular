import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReport'
})
export class SearchReportPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
        val.account_name.toLocaleLowerCase().includes(args) ||
        val.account_no.toLocaleLowerCase().includes(args) ||
        val.eslip_no.toLocaleLowerCase().includes(args);
      //  ||(val.eslip_no.toLocaleLowerCase().includes(args))
      //  ||(val.status.toLocaleLowerCase().includes(args))
      //  ||(val.accounts.toLocaleLowerCase().includes(args))
      //  ||(val.amount_to_pay.toLocaleLowerCase().includes(args))
      //  ||(val.created_at.toLocaleLowerCase().includes(args))
      //  ||(val.account_name.toLocaleLowerCase().includes(args));
      return rVal;
    });
  }
}
