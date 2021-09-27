import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mypayersSearch'
})
export class MypayersSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =
       (val.firstName.includes(args))
        || (val.lastName.includes(args))
        || (val.firstName.toLocaleLowerCase().includes(args))
        || (val.lastName.toLocaleLowerCase().includes(args))
        || (val.email.toLocaleLowerCase().includes(args))
        || (val.email.includes(args))
        || (val.company_name.toLocaleLowerCase().includes(args))
        || (val.company_name.includes(args));


      return rVal;
    });

  }

  // transform(value: any, args?: any): any {
  //   if (!args) {
  //     return value;
  //   }
  //   // created_at
  //   return value.filter((val: any) => {
  //     let rVal = (val.email.toLocaleLowerCase().includes(args))
  //        || (val.firstName.toLocaleLowerCase().includes(args))
  //        || (val.lastName.toLocaleLowerCase().includes(args))
  //        || (val.company_name.toLocaleLowerCase().includes(args))
  //        || (val.department.toLocaleLowerCase().includes(args))

  //     return rVal;
  //   });
  // }
}
