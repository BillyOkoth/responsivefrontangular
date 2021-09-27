import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billerSearch'
})
export class BillerSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.company_name.toLocaleLowerCase().includes(args))
      || (val.comp_code.toLocaleLowerCase().includes(args))
      || (val.email.toLocaleLowerCase().includes(args))
      || (val.sector.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
