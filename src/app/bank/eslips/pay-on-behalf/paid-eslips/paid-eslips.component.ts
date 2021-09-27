import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { EslipAccountsComponent } from '../e-slips/eslip-accounts/eslip-accounts.component';

@Component({
  selector: 'app-paid-eslips',
  templateUrl: './paid-eslips.component.html',
  styleUrls: ['./paid-eslips.component.scss']
})
export class PaidEslipsComponent implements OnInit {
  loading: boolean;
  rows = [];
  searchValue = '';
  aa = false;

  loadForm: FormGroup;

  billerLists: any;

  payerLists: any;
  paid = [];
  biller;
  payer;
  billerc = '';
  payerc = '';
  constructor(
    private eslipService: EslipsService,
    private fb: FormBuilder,
    private excelDownload: ExcelDataService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    public role: RolesService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.fetchUsers();
    const paid = [];
    this.loadForm = this.fb.group({
      payer: [''],
      biller: ['', [Validators.required]],
      to: ['', [Validators.required]],
      from: ['', [Validators.required]]
    });
  }

  changeBiller() {
    this.billerc = this.biller.comp_code;
  }

  changePayer() {
    this.payerc = this.payer.comp_code;
  }

  fetchUsers() {
    const payer = [{ company_name: 'All', comp_code: '' }];
    const biller = [];
    const payload = {};
    this.accountService.fetchAllUsers(payload).subscribe((response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (value.biller_type == 'payer') {
          payer.push(value);
          this.payerLists = payer;
        } else if(value.biller_type === "biller" && value.status.toLowerCase() === "active") {
          biller.push(value);
          this.billerLists = biller;
        }
      });
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }
  loadAccounts() {
    const lpend = [];
    this.loading = true;
    const formData = this.loadForm.value;
    this.paid = [];
    this.rows = [];
    let curr_date = '';
    let prev_date = '';

    if (formData.to == '' || formData.from == '') {
      (curr_date = new Date().toISOString()),
        (prev_date = new Date('25 Dec 2010').toISOString());
    } else {
      curr_date = formData.to;
      prev_date = formData.from;
    }

    const payload = {
      biller_code: this.billerc,
      payer_code: this.payerc,
      todate: curr_date,
      datefrom: prev_date
    };
    const newRows = [];
    this.accountService.getAllEslipsBank(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '02':
          this.toastr.warning(response.message);
          break;
        case '06':
          this.toastr.warning(response.message);
          break;
        default:
          response.forEach((value: any) => {
            if (value.status.toLowerCase() == 'paid') {
              lpend.push(value);
              this.paid = lpend;

              this.rows = this.paid;
              (this.billerc = ''), (this.payerc = '');
              this.biller = null;
              this.payer = null;
            }
          });
          break;
      }
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }

  viewEslip(slipNo: string) {
    this.eslipService.eslip_no = slipNo;

    this.router.navigate(['/admin/bank-receipt']);

  }

  viewEslipAc(slipNos: string) {
    sessionStorage.setItem('slip_nos', slipNos);


    this.modalService.create({
      nzTitle: 'Eslip Accounts.',
      nzContent: EslipAccountsComponent,
      nzFooter: null,
      nzWidth: '70vw'
    });

    // this.router.navigate(["/admin/eslip-accounts"]);



  }

  downloadCSV() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelIpaidEslip('Paid Eslip', rows);
    this.loading = false;
  }

  downloadEslip(value) {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: value
    };

    this.eslipService.downloadEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

        const blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'Paid Eslip.pdf');
      },
      (err: any) => {}
    );
  }
}
