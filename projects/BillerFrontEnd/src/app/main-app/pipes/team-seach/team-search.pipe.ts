import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamSearch'
})
export class TeamSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal =
        val.personel_f_name.toLocaleLowerCase().includes(args) ||
        val.personel_l_name.toLocaleLowerCase().includes(args) ||
        val.email.toLocaleLowerCase().includes(args) ||
        val.frozen.toLocaleLowerCase().includes(args) ||
        val.personel_f_name.includes(args) ||
        val.personel_l_name.includes(args) ||
        val.email.includes(args) ||
        val.frozen.includes(args) ||
        val.username.includes(args);

      return rVal;
    });
  }
}
