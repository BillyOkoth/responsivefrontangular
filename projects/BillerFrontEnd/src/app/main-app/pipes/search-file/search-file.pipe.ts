import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFile'
})
export class SearchFilePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.account_no.toLocaleLowerCase().includes(args))
       || (val.account_name.toLocaleLowerCase().includes(args))
       || (val.status.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }
}
