import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceEslipSearch'
})
export class InvoiceEslipSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    // created_at
    return value.filter((val: any) => {
    const rVal = (val.clients_name.toLocaleLowerCase().includes(args))
      || (val.eslip_no.toLocaleLowerCase().includes(args))
      || (val.account_no.toLocaleLowerCase().includes(args))
      || (val.created_by.toLocaleLowerCase().includes(args));


      return rVal;
    });
  }

}
