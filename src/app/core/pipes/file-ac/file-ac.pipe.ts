import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileAc'
})
export class FileAcPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.account_no.toLocaleLowerCase().includes(args))
      || (val.account_name.toLocaleLowerCase().includes(args));


      return rVal;
    });
  }

}
