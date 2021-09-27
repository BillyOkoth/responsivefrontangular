import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alerts'
})
export class AlertsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =
       (val.created_at.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
