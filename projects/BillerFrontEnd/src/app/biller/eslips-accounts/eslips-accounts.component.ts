import { Component, OnInit } from '@angular/core';
import { BillerService } from '../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ExcelDataService } from '../services/excel-data.service';

@Component({
  selector: 'app-eslips-accounts',
  templateUrl: './eslips-accounts.component.html',
  styleUrls: ['./eslips-accounts.component.css']
})
export class EslipsAccountsComponent implements OnInit {
  loading = false ;
  rows: any;
  cols: any;
  slipNumber: any;
  AccountsCount: any;
  aa = false;
  searchValue = '';


  constructor(
    private eslipService: BillerService,
    private toastr: ToastrService,
    private location: Location,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
   this.slipNumber = sessionStorage.getItem('slip_nos');
    this.getEslipAccounts(this.slipNumber);

    this.cols = [
      { field: 'account_name', header: 'Account Name'},
      { field: 'account_no', header: 'Account Number' },
      { field: 'amount_to_pay', header: 'Amount To Pay' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'status', header: 'Status' },
      { field: 'due_date', header: 'Due Date' }
    ];
  }


  getEslipAccounts(slipNo: string): void {
    const payload = {
      eslip_no: slipNo
    };

    this.loading = true;
    this.eslipService.getEslipAccounts(payload).subscribe((response: any) => {
      this.AccountsCount = response.length;
      this.loading = false;

      this.rows = response;
    }),
    (err: any) => {

      this.loading = false;
    };
  }

  closeView() {
    this.location.back();
  }

  downloadCSV() {
    const rows = [...this.rows];
    this.excelDownload.buildExcelEslipAccounts('Eslip Accounts', rows);
  }

  setIndex(ii) {
    this.aa = ii;

  }
}
