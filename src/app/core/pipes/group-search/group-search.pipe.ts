import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupSearch'
})
export class GroupSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.name.toLocaleLowerCase().includes(args))
      || (val.name.includes(args));


      return rVal;
    });
  }

}
