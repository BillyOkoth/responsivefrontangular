import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkOffPolicySearch'
})
export class CheckOffPolicySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.name.toLocaleLowerCase().includes(args))
      || (val.name.includes(args))
      || (val.policy_no.toLocaleLowerCase().includes(args))
      || (val.policy_no.includes(args))
      || (val.policy_holder_status.toLocaleLowerCase().includes(args))
      || (val.policy_holder_status.includes(args))
      || (val.amount_status.toLocaleLowerCase().includes(args))
      || (val.amount_status.includes(args))
      || (val.amount.toLocaleLowerCase().includes(args))
      || (val.amount.includes(args));


      return rVal;
    });
  }


}
