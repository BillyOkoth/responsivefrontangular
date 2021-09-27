import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eslipAc'
})
export class EslipAcPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.account_name.toLocaleLowerCase().includes(args))
       || (val.status.toLocaleLowerCase().includes(args))
       || (val.account_no.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
