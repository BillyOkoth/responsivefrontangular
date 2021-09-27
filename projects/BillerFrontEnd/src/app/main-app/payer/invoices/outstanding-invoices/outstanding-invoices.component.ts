import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { DisputeInvoiceModalComponent } from '../disputed-invoices/dispute-invoice-modal/dispute-invoice-modal.component';
import { InvoicePerServiceComponent } from './invoice-per-service/invoice-per-service.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-outstanding-invoices',
  templateUrl: './outstanding-invoices.component.html',
  styleUrls: ['./outstanding-invoices.component.css'],
})
export class OutstandingInvoicesComponent implements OnInit {
  rows = [];
  loading = false;
  outInvoices = [];
  searchValue = '';
  aa = false;
  isIndeterminate: boolean;
  isAllDisplayDataChecked: any;
  selectedRows = [];
  slipTotal = 0;
  length;
  toPayTotal: any = 0;
  services = [];
  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.getInvoicesPayer();

  }

  setIndex(ii) {
    this.aa = ii;
  }

  getInvoicesPayer() {
    // filter against...

    this.loading = true;

    const payload = {
      biller_code: sessionStorage.getItem('biller_code'),
    };

    this.outInvoices = [];
    this.rows = [];
    this.billerService.getInvoicesPayer(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach((value: any) => {
        if (value.status === 'Pending') {
          this.outInvoices.push(value);
        }
      });

      this.rows = this.outInvoices;
    });
  }

  disputeInvoices(value) {
    
    sessionStorage.setItem('InvoiceCode', value);

   const modal =  this.modalService.create({
      nzTitle: 'Dispute Invoice Modal',
      nzContent: DisputeInvoiceModalComponent,
      nzWidth: '30vW',
      nzFooter: null,
      nzMaskClosable: false,
    });
    modal.afterClose.pipe(map(() => {})).subscribe(() => {
      this.getInvoicesPayer();
    });
  }

  updateAllChecked(): void {
    this.isIndeterminate = false;
    if (this.isAllDisplayDataChecked) {
      this.rows = this.rows.map((item) => {
        return {
          ...item,
          checked: true,
        };
      });
      this.selectedRows = this.rows;

      this.onSelect();
    } else {
      this.rows = this.rows.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });
      this.selectedRows = this.selectedRows.filter((value) => {
        return value.checked == true;
      });
      this.selectedRows = [];
      this.onSelect();
    }
  }

  updateSingleChecked(value) {
    if (value.checked == true) {
      this.selectedRows.push(value);

      this.onSelect();
    } else {
      this.selectedRows = this.selectedRows.filter((value) => {
        return value.checked == true;
      });
      this.onSelect();
    }
  }

  sumTotal() {
    let total = 0;
    this.slipTotal = 0;
    this.selectedRows.forEach((value: any) => {
      total += Number(value.amount);
    });

    this.slipTotal = total;
  }

  // calcuate total pay
  payTotal() {
    let total = 0;
    this.toPayTotal = 0;
    this.length = this.selectedRows.length;
    this.selectedRows.forEach((value: any) => {
      total += Number(value.amount);
    });

    const cents = total.toString();
    const lastSelectedRow = this.selectedRows[this.selectedRows.length - 1];

    this.toPayTotal = total;

    const roundDP = this.toPayTotal.toFixed(2);

    this.toPayTotal = roundDP;
  }

  onSelect() {
    this.payTotal();
    this.sumTotal();
  }
  generateEslip() {
    this.loading = true;
    const invoices = [];

    if (this.selectedRows.length > 0) {
      // this.billerService.invoiceRows = this.selectedRows;

      this.selectedRows.forEach((value) => {
        const selectedInvoice = {
          account_no: value.invoice,
          account_name: value.email,
          amount_due: value.amount,
          amount_to_pay: value.amount,
          billers_code: value.biller_code,
          due_date: value.due_date,
        };
        invoices.push(selectedInvoice);
      });
    }
    // this.selectedRows = invoices;
    sessionStorage.setItem('invoiceRows', JSON.stringify(invoices));
    const payload = {
      biller_code: sessionStorage.getItem('biller_code'),
      total_amount_due: this.slipTotal.toString(),
      total_amount_to_pay: this.toPayTotal.toString(),
      eslipInfo: invoices,
    };

    // this.billerService.generateEslip(payload).subscribe((response: any) => {
    //   this.loading = false;
    //   if (response.messageCode == "00") {
    //     this.toastr.success("Success", response.message);
    //     this.getInvoicesPayer();
    //   } else if (response.messageCode == "02") {
    //     this.toastr.warning("Warning", response.message);
    //   } else if (response.messageCode == "06") {
    //     this.toastr.warning("Warning", response.message);
    //   } else {
    //   }
    // });
    // this.getInvoicesPayer();
  }

  organizeInvoices() {
    // sessionStorage.setItem("invoiceRows", JSON.stringify(this.selectedRows));
    const invoices = [];
    if (this.selectedRows.length > 0) {
      // this.billerService.invoiceRows = this.selectedRows;

      this.selectedRows.forEach((value) => {
        const selectedInvoice = {
          account_no: value.invoice,
          account_name: value.email,
          amount_due: value.amount,
          amount_to_pay: value.amount,
          billers_code: value.biller_code,
          due_date: value.due_date,
          service_id: value.service_id,
        };
        invoices.push(selectedInvoice);
      });
    }
    // this.selectedRows = invoices;
    sessionStorage.setItem('invoiceRows', JSON.stringify(invoices));
    this.modalService.create({
      nzTitle: 'Eslips according to Service',
      nzContent: InvoicePerServiceComponent,
      nzWidth: '70%',
      nzFooter: null,
    });
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.outstandingInvoice('Outstanding Invoice', rows);
    this.loading = false;
  }
}
