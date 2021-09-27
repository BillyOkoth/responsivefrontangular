import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceLinePipe'
})
export class ServiceLinePipePipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =

      (val.service_line.toLocaleLowerCase().includes(args)) ||
      (val.service_line.includes(args)) ||
      (val.email.toLocaleLowerCase().includes(args)) ||
      (val.email.includes(args)) ||
      (val.currency.toLocaleLowerCase().includes(args)) ||
      (val.currency.includes(args)) ||
      (val.prefix.toLocaleLowerCase().includes(args)) ||
      (val.prefix.includes(args));
      // (val.payer_name.toLocaleLowerCase().includes(args))



      return rVal;
    });
  }

}
