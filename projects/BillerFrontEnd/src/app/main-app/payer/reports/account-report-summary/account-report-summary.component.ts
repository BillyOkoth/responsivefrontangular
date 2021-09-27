import { Component, OnInit, ViewChild } from '@angular/core';
import * as core from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { Router } from '@angular/router';

import { ExcelDataService } from '../../../../service/excel-data.service';
import { ReportServiceService } from '../../../../service/reports-service/report-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-report-summary',
  templateUrl: './account-report-summary.component.html',
  styleUrls: ['./account-report-summary.component.css']
})
export class AccountReportSummaryComponent implements OnInit {
  // @core.ViewChild(DatatableComponent, { static: false })
  editing = {};
  searchValue = '';
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  number;
  resp: any;
  cols;

  aa = false;

  selectedStatus = [];
  selectedRow;
  newArray = [];
  date: number;
  dateTimeout: any;

  eslipStatus = [
    { status: 'Pending', checked: false },
    { status: 'Paid', checked: false },
    { status: 'Rejected', checked: false }
  ];
  filteredArray;
  loading: boolean;
  newRow: boolean;
  row: any;
  displayDialog: boolean;
  listOfSearchName: string[] = [];
  listOfSearchAddress: string[] = [];
  listOfFilterName = [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }];
  listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfData: any[] = [];
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: string | null } = {
    name: null,
    age: null,
    address: null
  };
  sortName: string | null = null;
  sortValue: string | null = null;

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  search(listOfSearchName: string[], listOfSearchAddress: string[]): void {
    this.listOfSearchName = listOfSearchName;
    this.listOfSearchAddress = listOfSearchAddress;
    const filterFunc = (item: any) =>
      (this.listOfSearchAddress.length
        ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
        : true) &&
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const listOfData = this.listOfData.filter((item: any) => filterFunc(item));
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.listOfDisplayData = listOfData;
    }
  }

  resetFilters(): void {
    this.listOfFilterName = [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }];
    this.listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
    this.listOfSearchName = [];
    this.listOfSearchAddress = [];
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  resetSortAndFilters(): void {
    this.sortName = null;
    this.sortValue = null;
    this.mapOfSort = {
      name: null,
      age: null,
      address: null
    };
    this.resetFilters();
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  constructor(
    private loginService: LoginService,
    private excelDownload: ExcelDataService,
    private router: Router,
    private toastr: ToastrService,
    private reportService: ReportServiceService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getMyAccounts();

    this.cols = [
      { field: 'account_name', header: 'Account Name' },
      { field: 'account_no', header: 'Account No' },
      { field: 'amount_due', header: 'Amount Due' }
    ];
  }

  sortTable() {
    const trueA = [];
    let sorted = [];
    for (const status of this.eslipStatus) {
      if (status.checked === true) {
        trueA.push(status);
      }
    }

    for (const resp of this.resp) {
      for (const group of trueA) {
        if (resp.status === group.status) {
          sorted.push(resp);
        }
      }
    }

    if (sorted.length < 1) {
      sorted = this.resp;
    }

    this.rows = sorted;
  }

  granulateTable() {
    this.router.navigate(['/app/granulated-table']);
  }

  onActivate() {}
  onSelect() {}

  onYearChange(event, dt) {
    if (this.dateTimeout) {
      clearTimeout(this.dateTimeout);
    }

    this.dateTimeout = setTimeout(() => {
      dt.filter(event.value, 'date', 'gt');
    }, 250);
  }
  getMyAccounts() {
    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };
    this.loginService.loadPayerAccounts(payload).subscribe(response => {
      this.loading = false;

      this.temp = [...response];
      this.rows = response;
    }, (err: any) => {

    });
  }

  downloadCSV() {
    const rows = [...this.rows];
    this.excelDownload.buildExcelIviewAccountsReports('Accounts Reports', rows);
  }

  onRowSelect(value) {
    this.loginService.accountName = value.account_name;
    this.reportService.account_no = value.account_no;

    this.router.navigate(['/app/dashboard/account-report-summary']);
  }

  setIndex(ii) {
    this.aa = ii;

  }


}
