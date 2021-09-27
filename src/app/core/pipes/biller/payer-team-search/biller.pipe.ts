import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billerTeam'
})
export class BillerTeamPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      const rVal = (val.group.toLocaleLowerCase().includes(args))
      || (val.comp_code.toLocaleLowerCase().includes(args))
      || (val.email.toLocaleLowerCase().includes(args))
      || (val.phone.toLocaleLowerCase().includes(args))
      || (val.personel_l_name.toLocaleLowerCase().includes(args))
      || (val.comp_code.includes(args))
      || (val.email.includes(args))
      || (val.group.includes(args))
      || (val.phone.includes(args))
      || (val.personel_l_name.includes(args));


      return rVal;
    });
  }

}
