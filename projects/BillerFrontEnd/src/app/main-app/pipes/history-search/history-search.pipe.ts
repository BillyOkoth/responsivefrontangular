import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historySearch'
})
export class HistorySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
      (val.eslip_no.toLocaleLowerCase().includes(args))
      || (val.payref.toLocaleLowerCase().includes(args))
      || (val.corporateid.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
