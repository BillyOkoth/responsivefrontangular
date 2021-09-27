import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceSearch'
})
export class InvoiceSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
      const rVal =

      (val.invoice.toLocaleLowerCase().includes(args)) ||
      (val.invoice.includes(args)) ||
      (val.service.toLocaleLowerCase().includes(args)) ||
      (val.service.includes(args));
      // (val.payer_name.toLocaleLowerCase().includes(args))



      return rVal;
    });
  }

}
