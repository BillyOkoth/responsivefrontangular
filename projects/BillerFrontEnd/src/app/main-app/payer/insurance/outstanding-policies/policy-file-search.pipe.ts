import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policyFileSearch'
})
export class PolicyFileSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.payer_name.toLocaleLowerCase().includes(args))
      || (val.payer_name.includes(args))
      || (val.policy_no.toLocaleLowerCase().includes(args))
      || (val.policy_no.includes(args))
      || (val.policy_holder_status.toLocaleLowerCase().includes(args))
      || (val.policy_holder_status.includes(args))
      || (val.name.toLocaleLowerCase().includes(args))
      || (val.name.includes(args));


      return rVal;
    });
  }

}
