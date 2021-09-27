import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectorSearch'
})
export class SectorSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((val: any) => {
      const rVal = (val.name.toLocaleLowerCase().includes(args))
        || (val.code.toLocaleLowerCase().includes(args)) || (val.code.includes(args)) || (val.name.includes(args));


      return rVal;
    });
  }

}
