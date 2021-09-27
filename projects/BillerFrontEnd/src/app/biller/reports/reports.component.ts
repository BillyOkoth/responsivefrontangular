import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../services/biller-service/biller.service';
import { Location } from '@angular/common';
import { ExcelDataService } from '../services/excel-data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportForm: FormGroup;
  cols: any;
  rows: any;
  loading: boolean;
  respLength: any;
  searchValue = '';
  biller: string;

  constructor(
    private fb: FormBuilder,
    private billerService: BillerService,
    private location: Location,
    private excelService: ExcelDataService
  ) {}

  ngOnInit() {
    this.reportForm = this.fb.group({
      to: ['', [Validators.required]],
      from: ['', [Validators.required]]
    });

    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'eslip_no', header: 'Eslip No' },
      { field: 'account_no', header: 'Account No.' },
      { field: 'bank_ref_no', header: 'Bank Ref No' },
      { field: 'biller_payment_ref', header: 'Biller Payment Ref' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'status', header: 'Status' },
      { field: 'due_date', header: 'Due Date' }
    ];
    this.biller = sessionStorage.getItem('billertype').toLowerCase();
  }

  getReconcileReports() {
    if (this.biller == 'open') {
      this.eslipReport();
    } else if (this.biller == 'closed') {
      this.invoiceReport();
    }
  }

  eslipReport() {
    this.loading = true;
    const formData = this.reportForm.value;
    const payload = {
      datefrom: formData.from,
      todate: formData.to
    };
    this.billerService
      .getReconcileReports(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.rows = response;
        this.respLength = response.length;
      });
  }

  invoiceReport() {
    this.loading = true;
    const formData = this.reportForm.value;
    const payload = {
      datefrom: formData.from,
      todate: formData.to
    };
    this.billerService.invoiceReport(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
      this.respLength = response.length;
    });
  }
  closeView() {
    this.location.back();
  }

  downloadExcel() {
    const rows = [...this.rows];
    this.excelService.buildReports('Reports', rows);
  }
}
