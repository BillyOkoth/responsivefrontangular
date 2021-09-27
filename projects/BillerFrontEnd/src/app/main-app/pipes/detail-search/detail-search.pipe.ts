import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detailSearch'
})
export class DetailSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.trans_date.toLocaleLowerCase().includes(args))
      || (val.eslip_no.toLocaleLowerCase().includes(args))
      || (val.trans_id.toLocaleLowerCase().includes(args))
      || (val.account_name.toLocaleLowerCase().includes(args))
      || (val.meter_ft.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
