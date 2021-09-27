import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.account_no.toLocaleLowerCase().includes(args))
       || (val.account_name.toLocaleLowerCase().includes(args))
       || (val.amount_due.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }
}
