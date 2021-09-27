import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historyReports'
})
export class HistoryReportsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.eslip_no.toLocaleLowerCase().includes(args))
      || (val.eslip_no.includes(args))
      || (val.payref.toLocaleLowerCase().includes(args))
      || (val.payref.includes(args));


      return rVal;
    });
  }


}
