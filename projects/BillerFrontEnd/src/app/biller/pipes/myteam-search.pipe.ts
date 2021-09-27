import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myteamSearch'
})
export class MyteamSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.email.toLocaleLowerCase().includes(args))
         || (val.personel_f_name.toLocaleLowerCase().includes(args))
         || (val.personel_l_name.toLocaleLowerCase().includes(args))
         || (val.groupDescription.toLocaleLowerCase().includes(args))
         || (val.frozen.toLocaleLowerCase().includes(args));

      return rVal;
    });
  }

}
