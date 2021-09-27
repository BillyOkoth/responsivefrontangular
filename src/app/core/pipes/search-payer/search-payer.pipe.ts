import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPayer'
})
export class SearchPayerPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
       val.email.toLocaleLowerCase().includes(args)
      || (val.email.includes(args))
      || (val.company_name.includes(args))
      || (val.company_name.toLocaleLowerCase().includes(args))
      || (val.email.toLocaleLowerCase().includes(args))
      || (val.email.includes(args))
      || (val.comp_code.toLocaleLowerCase().includes(args))
      || (val.comp_code.includes(args))
      || (val.status.toLocaleLowerCase().includes(args))
      || (val.status.includes(args));

      return rVal;
    });
  }
}
