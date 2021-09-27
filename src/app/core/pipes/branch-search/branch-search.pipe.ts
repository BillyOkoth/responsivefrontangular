import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchSearch'
})
export class BranchSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.branchCode.toLocaleLowerCase().includes(args))
      || (val.branchName.toLocaleLowerCase().includes(args))

      || (val.branchCode.includes(args))
      || (val.branchName.includes(args));

      return rVal;
    });
  }

}
