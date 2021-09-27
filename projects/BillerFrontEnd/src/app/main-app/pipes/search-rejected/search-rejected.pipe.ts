import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRejected'
})
export class SearchRejectedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {

      const rVal =  (val.accountNo.toLocaleLowerCase().includes(args))
           || (val.status.toLocaleLowerCase().includes(args))
           || (val.amount.toLocaleLowerCase().includes(args))
           || (val.amount_status.toLocaleLowerCase().includes(args))
           || (val.amount_status.includes(args))
           || (val.status.includes(args));

      return rVal;
    });

  }

}
