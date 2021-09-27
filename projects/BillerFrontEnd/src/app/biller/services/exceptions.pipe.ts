import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exceptions'
})
export class ExceptionsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.amount.toLocaleLowerCase().includes(args))
       || (val.ft.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
