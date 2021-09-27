import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uploadSearch'
})
export class UploadSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal = (val.created_by.toLocaleLowerCase().includes(args))
         || (val.file_name.toLocaleLowerCase().includes(args));

      return rVal;
    });

}
}
