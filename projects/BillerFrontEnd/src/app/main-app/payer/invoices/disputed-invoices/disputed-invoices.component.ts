import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';

@Component({
  selector: 'app-disputed-invoices',
  templateUrl: './disputed-invoices.component.html',
  styleUrls: ['./disputed-invoices.component.css']
})
export class DisputedInvoicesComponent implements OnInit {
  rows = [];
  loading = false;
  disputedInvoices = [];
  searchValue = '';
  aa = false;
  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.getInvoicesPayer();
  }

  getInvoicesPayer() {
    this.loading = true;

    const payload = {

      biller_code: sessionStorage.getItem('biller_code')
    };
    this.disputedInvoices = [];
    this.rows = [];
    this.billerService.getInvoicesPayer(payload).subscribe(
      (response: any) => {
        this.loading = false;

        response.forEach(
          (value: any) => {
            if (value.status === 'Disputed') {
              this.disputedInvoices.push(value);
            }
        });

        this.rows = this.disputedInvoices;
      }
    );


  }


  setIndex(ii) {
    this.aa = ii;
  }

  downloadExcel() {
    this.loading =  true;
    const rows = [...this.rows];

    this.excelDownload.disputedInvoice('Disputed Invoice', rows);
    this.loading =  false;
  }

}
