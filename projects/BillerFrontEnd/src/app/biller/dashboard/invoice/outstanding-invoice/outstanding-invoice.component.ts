import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { ExcelDataService } from '../../../services/excel-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-outstanding-invoice',
  templateUrl: './outstanding-invoice.component.html',
  styleUrls: ['./outstanding-invoice.component.css']
})
export class OutstandingInvoiceComponent implements OnInit {

  rows = [];
  loading = false;
  outInvoice = [];
  searchValue = '';
  aa = false;
  constructor(
    private toastr: ToastrService,
    private billerService: BillerService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.billerService.uploadedInvoiceSeSubject.subscribe(
      value => {
        this.getInvoices();
      }
    );

  }

  getInvoices() {
    this.loading = true;
    const payload = {};

    this.rows = [];
    this.outInvoice = [];

    this.billerService.getInvoices(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (value.status === 'Pending') {
            this.outInvoice.push(value);
          }
        });
        this.rows = this.outInvoice;
      }
    );
  }
  setIndex(ii) {
    this.aa = ii;
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.outstandingInvoice('Outstanding Invoice', rows);
    this.loading = false;
  }

  resendInvoice(data) {
    this.loading = true;

    const payload = {
      invoice_no: data.invoice
    };

    this.billerService.reSendInvoiceEmail(payload).subscribe(
      (response: any) => {
        this.loading = false;
        switch (response.messageCode) {
          case '02':
            this.toastr.warning(response.message);
            break;
          case '06':
            this.toastr.warning(response.message);
            break;
          default:
            this.toastr.success(response.message);

            break;
        }

      }
    );
  }
}
