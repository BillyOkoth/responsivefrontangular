import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargePipe'
})
export class ChargePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
        (val.eslip_no.toLocaleLowerCase().includes(args))
        || (val.account_name.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
