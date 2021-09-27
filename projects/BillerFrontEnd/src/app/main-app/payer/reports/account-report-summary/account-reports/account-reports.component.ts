import { Component, OnInit } from '@angular/core';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportServiceService } from 'projects/BillerFrontEnd/src/app/service/reports-service/report-service.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-reports',
  templateUrl: './account-reports.component.html',
  styleUrls: ['./account-reports.component.css'],
  providers: [DatePipe]
})
export class AccountReportsComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  number;
  resp: any;
  cols;


  selectedStatus = [];
  newArray = [];
  date: number;
  dateTimeout: any;
  date1 = '';
  date2 = '';
  filteredDates = [];
  selectedDates = [];
  dbval;
  respLength;

  dateForm: FormGroup;

  eslipStatus = [
    { status: 'Pending', checked: false },
    { status: 'Paid', checked: false },
    { status: 'Rejected', checked: false }
  ];
  filteredArray;
  loading: boolean;
  dateFilters: any;
  minDate: Date;

  maxDate: Date;

  invalidDates: Array<Date>;
  dateFormat = 'yyyy/MM/dd';
  constructor(
    public loginService: LoginService,
    private excelDownload: ExcelDataService,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    public reportService: ReportServiceService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.dateForm = this.fb.group({
      date1: ['', Validators.required],
      date2: ['', Validators.required]
    });
    this.loading = true;
    const payload = {
      account_no: this.reportService.account_no,

      biller_code: sessionStorage.getItem('biller_code')
    };

    this.reportService.getAccountReports(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.resp = response;
        this.rows = response;
        this.temp = [...response];
        this.respLength = response.length;
      },
      (err: any) => {

      }
    );
    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'eslip_no', header: 'Eslip No' },
      { field: 'bank_ref_no', header: 'Bank Ref No.' },
      { field: 'bank_ref_no', header: 'Biller Ref' },
      { field: 'eslipamountDue', header: 'Amount Due' },
      { field: 'amount_to_pay', header: 'Amount Paid' },
      { field: 'due_date', header: 'Due Date' },
      { field: 'eslipStatus', header: 'Status' }
    ];
  }

  onActivate() {}
  onSelect() {}

  downloadCSV() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelIviewEslipReports(' Account Reports', rows);
    this.loading =  false;
  }

  closeView() {
    this.location.back();
  }

  filterDate() {
    const d1 = Date.parse(
      this.datePipe.transform(this.dateForm.value.date1, 'yyyy-MM-dd')
    );
    const d2 = Date.parse(
      this.datePipe.transform(this.dateForm.value.date2, 'yyyy-MM-dd')
    );
    this.selectedDates.push(d1, d2);

    const last = this.selectedDates.length - 1;
    if (this.selectedDates.length == 2) {
      this.resp.forEach((value: any) => {
        const intVal = Date.parse(value.created_at.slice(0, 10).trim());
        if (intVal >= d1 && intVal <= d2) {
          this.filteredDates.push(value);
        }
      });
      this.rows = this.filteredDates;
    } else {
      this.selectedDates = [];
      this.filteredDates = [];
      this.date2 = '';
      this.date1 = '';
      this.dateForm.reset();
      this.rows = this.resp;
    }
  }
  resetSort() {
    this.selectedDates = [];
    this.filteredDates = [];
    this.date1 = '';
    this.date2 = '';
    this.rows = this.resp;
  }
}
