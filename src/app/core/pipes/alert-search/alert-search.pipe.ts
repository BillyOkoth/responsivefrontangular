import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alertSearch'
})
export class AlertSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.created_by.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }


}
