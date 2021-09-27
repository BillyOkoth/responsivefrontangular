import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detailReport'
})
export class DetailReportPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.account_name.toLocaleLowerCase().includes(args))
      || (val.account_name.includes(args))
      || (val.meter_ft.toLocaleLowerCase().includes(args))
      || (val.meter_ft.includes(args));


      return rVal;
    });
  }

}
