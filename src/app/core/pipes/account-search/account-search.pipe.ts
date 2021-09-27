import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountSearch'
})
export class AccountSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.account_no.toLocaleLowerCase().includes(args))
      || (val.account_name.toLocaleLowerCase().includes(args))
      || (val.account_name.includes(args))
      || (val.alias.toLocaleLowerCase().includes(args))
      || (val.alias.includes(args));

      return rVal;
    });
  }

}
