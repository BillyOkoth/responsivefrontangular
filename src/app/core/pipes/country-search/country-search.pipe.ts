import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countrySearch'
})
export class CountrySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.countryName.toLocaleLowerCase().includes(args))
      || (val.countryCode.toLocaleLowerCase().includes(args))
      || (val.countryName.includes(args))
      || (val.countryCode.includes(args));



      return rVal;
    });
  }

}
