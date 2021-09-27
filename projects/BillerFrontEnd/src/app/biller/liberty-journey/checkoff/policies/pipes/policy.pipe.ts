import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policy',
})
export class PolicyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =
        val.amount.toLocaleLowerCase().includes(args) ||
        val.amount.includes(args) ||
        val.payer_name.toLocaleLowerCase().includes(args) ||
        val.payer_name.includes(args) ||
        val.policy_no.toLocaleLowerCase().includes(args) ||
        val.policy_no.includes(args);

      return rVal;
    });
  }
}
