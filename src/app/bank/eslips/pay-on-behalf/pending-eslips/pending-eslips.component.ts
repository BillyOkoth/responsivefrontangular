import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';

import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayEslipComponent } from '../pay-eslip/pay-eslip.component';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { EslipAccountsComponent } from '../e-slips/eslip-accounts/eslip-accounts.component';

@Component({
  selector: 'app-pending-eslips',
  templateUrl: './pending-eslips.component.html',
  styleUrls: ['./pending-eslips.component.scss']
})
export class PendingEslipsComponent implements OnInit {
  rows = [];
  cols = [];
  loading: boolean;
  loadForm: FormGroup;

  billerLists: any;
  aa = false;
  searchValue = '';

  payerLists: any;
  selectedEslip = '';
  pending = [];
  billerc = '';
  payerc = '';
  biller;
  payer;

  constructor(
    private eslipService: EslipsService,
    private modalService: NzModalService,   
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    public role: RolesService
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.loadForm = this.fb.group({
      biller: [''],
      payer: ['']
    });
    this.loadForm = this.fb.group({
      payer: ['', [Validators.required]],
      biller: ['', [Validators.required]],
      to: ['', [Validators.required]],
      from: ['', [Validators.required]]
    });
    const pending = [];
    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'amount', header: 'Amount' },
      { field: 'status', header: 'Status' },
      { field: 'accounts', header: 'No of Accounts' },
      { field: 'eslip_no', header: 'EslipNo' }
    ];
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
    this.pending = [];
    const lpend = [];
    this.rows = [];
    this.loading = true;
    const formData = this.loadForm.value;
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

    this.accountService.getAllEslipsBank(payload).subscribe((response: any) => {
      this.loading = false;
      const newRows = [];
      switch (response.messageCode) {
        case '02':
          this.toastr.warning(response.message);
          break;
        case '06':
          this.toastr.warning(response.message);
          break;
        default:
          response.forEach((value: any) => {
            if (value.status.toLowerCase() == 'pending') {
              lpend.push(value);
              this.pending = lpend;
              this.rows = this.pending;

              (this.billerc = ''), (this.payerc = '');
              this.biller = null;
              this.payer = null;
            }
          });
          this.ngOnInit();
          break;
      }
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
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
        saveAs(blob, 'Pending Eslip.pdf');
      },
      e => {
        this.toastr.error('There is no server connection!');
      }
    );
  }

  viewEslipAc(slipNos: string) {
    sessionStorage.setItem('slip_nos', slipNos);

    this.modalService.create({
      nzTitle: 'Eslip Accounts.',
      nzContent: EslipAccountsComponent,
      nzFooter: null,
      nzWidth: '70vw'
    });
    // this.router.navigate(['/admin/eslip-accounts']);
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelIpendingEslip('Pending Eslip', rows);
    this.loading = false;
  }

  payEslip(value) {
    this.eslipService.eslip_no = value.eslip_no;
    this.eslipService.amount_to_pay = value.amount_to_pay;
  }

  save(slipNo: string) {}
  onItemClick(value: string) {}

  approvePayment(slipNos: string) {
    this.loading = true;
    const payload = {
      eslipNo: slipNos
    };

    this.eslipService.approveEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');
        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      (err: any) => {}
    );
  }

  setIndex(ii) {
    this.aa = ii;
  }
}
