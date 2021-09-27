import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payerSearch'
})
export class PayerSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.email.toLocaleLowerCase().includes(args));


      return rVal;
    });
  }

}
