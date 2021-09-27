import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policySearch'
})
export class PolicySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =

      (val.file_id.toLocaleLowerCase().includes(args)) ||
      (val.created_at.includes(args)) ||
      (val.status.toLocaleLowerCase().includes(args)) ||
      (val.amount.includes(args));

      return rVal;
    });
  }

}
