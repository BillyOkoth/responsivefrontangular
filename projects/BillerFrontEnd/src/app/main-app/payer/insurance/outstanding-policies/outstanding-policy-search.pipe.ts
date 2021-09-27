import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outstandingPolicySearch'
})
export class OutstandingPolicySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.status.toLocaleLowerCase().includes(args))
      || (val.status.includes(args))
      || (val.file_id.toLocaleLowerCase().includes(args))
      || (val.file_id.includes(args))
      || (val.amount.toLocaleLowerCase().includes(args))
      || (val.amount.includes(args));


      return rVal;
    });
  }


}
