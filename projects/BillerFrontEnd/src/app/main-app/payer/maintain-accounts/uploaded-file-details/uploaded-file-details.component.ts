import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { getUploadedFilesRecords } from '../../../../service/login.model';
import { ExcelDataService } from '../../../../service/excel-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaded-file-details',
  templateUrl: './uploaded-file-details.component.html',
  styleUrls: ['./uploaded-file-details.component.css'],
})
export class UploadedFileDetailsComponent implements OnInit {
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  cols = [];
  searchValue = '';

  loadingIndicator = true;

  aa = false;
  loading = false;
  generatedData = [];
  localData = [];

  Accountno;
  AccountName;
  AccountBalance;
  Validation;
  DateCreated;

  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' },
  ];


  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'status',
    'weight',
    'actions',
  ];

  fileId = '';
  fileName = '';



  constructor(
    private loginService: LoginService,
    private router: Router,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // this.dataSource.data = this.loginService.selectedAccounts;
    this.fileId = this.loginService.file_id;
    this.fileName = this.loginService.file_name;

    this.cols = [
      { field: 'account_no', header: 'Account Number' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'account_balance', header: 'Account Balance' },
      { field: 'status', header: 'Validation' },
      { field: 'created_at', header: 'Created Date' },
    ];

    this.getUploadedFilesRecords();
  }

  /**
   * @description:: close this window
   */
  closeView() {
    this.router.navigate(['app/dashboard/uploaded-file-summary']);
  }



  getUploadedFilesRecords(): void {
    const payload: getUploadedFilesRecords = {
      file_id: this.loginService.file_id,
    };
    this.loading = true;
    this.loginService.getUploadedFilesRecords(payload).subscribe(response => {
      this.loading = false;

      // this.dataSource.data = response;
      this.localData = response;
      this.generatedData = response;
      this.temp = [...response];
      this.rows = response;

      response.forEach((value: any) => {
        //  this.localData = value ;
        this.Accountno = value.account_no;
        this.AccountName = value.account_name;
        this.AccountBalance = value.account_balance;
        this.Validation = value.status;
        this.DateCreated = value.created_at;
      });
    }), (err: any) => {

    };
  }

  onActivate(event) {}

  /// download csv
  downloadCSV() {
    this.loading =  true;
     const  rows =  [...this.rows];

    this.excelDownload.buildExcelIviewDetails('DetailedAccounts', rows);
    this.loading = false;

  }

  onSelect({ selected }) {}

  setIndex(ii) {
    this.aa = ii;
  }

}
