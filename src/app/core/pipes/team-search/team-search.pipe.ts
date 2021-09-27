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
      const rVal = (val.username.toLocaleLowerCase().includes(args))
      || (val.otherName.toLocaleLowerCase().includes(args));


      return rVal;
    });
  }

}
