import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../service/login.service';

import { SelectionModel } from '@angular/cdk/collections';

import { Router } from '@angular/router';
import { PeriodicElement } from '../../main-app/payer/maintain-accounts/view-accounts/view-accounts.component';
import { BillerService } from '../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from '../services/excel-data.service';
import { EslipsAccountsComponent } from '../eslips-accounts/eslips-accounts.component';
import { NzModalService } from 'ng-zorro-antd';
import { ReceiptComponent } from './receipt/receipt.component';

@Component({
  selector: 'app-generated-eslip',
  templateUrl: './generated-eslip.component.html',
  styleUrls: ['./generated-eslip.component.css']
})
export class GeneratedEslipComponent implements OnInit {
  aa = false;
  loading = false;
  searchValue = '';
  rows: any;
  cols = [];
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getmyEslips();
    this.cols = [
      { field: 'created_at', header: 'First Name' },
      { field: 'eslip_no', header: 'Last Name' },
      { field: 'bank_ref_no', header: 'Bank Ref No.' },
      { field: 'status', header: 'Status' },
      { field: 'accounts', header: 'Accounts' }
    ];
  }

  // Generate the e slips.

  getmyEslips() {
    this.loading = true;

    const pending = [];
    const payload = {};
    this.billerService.getMyEslipsBiller(payload).subscribe((response: any) => {
      this.loading = false;
      if (response[0].messageCode == '00') {
        response.forEach(value => {
          if (value.status.toLowerCase() == 'paid') {
            pending.push(value);
          }
        });
        this.rows = pending;
      }
    }),
      (err: any) => {
        this.loading = false;
      };
  }

  viewEslip(slipNo: string) {
    sessionStorage.setItem('slip_no', slipNo);
    this.router.navigate(['/biller/dashboard/receipt-eslip']);
  
    // this.modalService.create({
    //   // nzTitle: 'View Eslip Accounts.',
    //   nzContent: ReceiptComponent,
    //   nzWidth: '70%',
    //   nzFooter: null,
    //   nzMaskClosable: false,
    // });
  }

  viewEslipAc(slipNos: string) {   
    // this.router.navigate(['/biller/dashboard/biller-e-slip-ac']);
    sessionStorage.setItem('slip_nos', slipNos);
    this.modalService.create({
      nzTitle: 'View Eslip Accounts.',
      nzContent: EslipsAccountsComponent,
      nzWidth: '70%',
      nzFooter: null,
      nzMaskClosable: true,
    });
  }

  

  downloadCSV() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelIpaidEslip('Paid Eslip', rows);
    this.loading = false;
  }

  setIndex(ii) {
    this.aa = ii;
  }
}
