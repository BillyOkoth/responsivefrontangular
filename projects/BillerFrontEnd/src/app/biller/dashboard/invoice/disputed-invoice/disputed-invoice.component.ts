import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { ExcelDataService } from '../../../services/excel-data.service';

@Component({
  selector: 'app-disputed-invoice',
  templateUrl: './disputed-invoice.component.html',
  styleUrls: ['./disputed-invoice.component.css']
})
export class DisputedInvoiceComponent implements OnInit {

  loading = false;
  rows = [];
  searchValue = '';
  disputedInvoice = [];
  aa = false;
  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.loading = true;
    const payload = {};

    this.rows = [];
    this.disputedInvoice = [];

    this.billerService.getInvoices(payload).subscribe(
      (response: any) => {
        this.loading = false;

        response.forEach((value: any) => {
          if (value.status === 'Disputed') {
            this.disputedInvoice.push(value);
          }
        });
       this.rows = this.disputedInvoice;

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
