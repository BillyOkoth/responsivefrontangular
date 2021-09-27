import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rejected-files',
  templateUrl: './rejected-files.component.html',
  styleUrls: ['./rejected-files.component.css'],
})
export class RejectedFilesComponent implements OnInit {
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;
  aa = false;
  searchValue = '';
  cols = [];
  rows1 = [];
  clonedRows = {};

  generatedData = [];
  selectedRows = [];

  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];

  loading = false;
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'duedata',
    'amtpay'
  ];
  slipTotal = 0;
  toPayTotal: any = 0;
  billerCode;
  dueDate;
  failedAccounts;
  notFoundAcccounts = [];
  amountFailed = [];
  payments = [];
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
    public loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private excelData: ExcelDataService,

  ) {}

  ngOnInit() {
    this.generatedData = this.payments;
    this.temp = [...this.payments];
    this.rows = this.payments;

    this.getFailedAccounts();

    this.cols = [
      { field: 'accountNo', header: 'Account Number' },
      { field: 'status', header: 'Account Status' },
      { field: 'amount', header: 'Amount' },
      { field: 'amount_status', header: 'Amount Status' }
    ];
  }

  getFailedAccounts() {
    this.loginService.failedAccount.forEach((value: any) => {
      this.failedAccounts = value.length;



      value.forEach((element: any) => {
        if (element.status == 'NOT FOUND') {
          this.notFoundAcccounts.push(element.status);
        }

        if (element.amount_status === 'FAIL') {
          this.amountFailed.push(element.amount_status);
        }
      });

      this.rows = value;
    });
  }



  downloadCSV() {
    this.loading = true;
    const rows   = [...this.rows];

    this.excelData.buildExcelIvalidAccount('rejected',  rows);
    this.loading = false;
  }

  closeView() {
    this.router.navigate(['app/dashboard/generated-e-slip']);
  }

  onActivate() {}

  toUploadedFile() {
    this.router.navigate(['app/dashboard/uploaded-payment-summary']);
  }

  setIndex(ii) {
    this.aa = ii;

  }
}
