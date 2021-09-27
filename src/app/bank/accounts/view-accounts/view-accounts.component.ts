import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddAccountsComponent } from '../add-accounts/add-accounts.component';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

export interface PeriodicElement {
  eslip_no: any;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.scss']
})
export class ViewAccountsComponent implements OnInit {
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private modalService: NzModalService,
    public role: RolesService
  ) { }
  loading = false;
  loadForm: FormGroup;
  editing = {};
  rows = [];
  temp = [];
  cols = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;
  biller_code;
  billerc = '';
  payerc = '';
  color = '#32a852';
  searchValue = '';
  aa = false;

  displayDialog: boolean;
  row = {};
  selectedRows = [];
  newRow: boolean;
  aliasForm: FormGroup;
  msgs = [];
  totalRecords;
  selectedRow;
  data1: any;
  user_type;

  biller;
  payer;
  billerLists: any;
  payerLists: any;
  allRights: any;
  accountRights: any;

  slipTotal = 0;

  ngOnInit() {
    this.fetchUsers();
    this.color = '#32a852';
    this.loading = true;
    this.biller_code = this.accountService.biller_code;
    this.user_type = sessionStorage.getItem('user-type');
    this.cols = [
      { field: 'account_no', header: 'Account No' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'alias', header: 'Other Name' }
    ];
    this.aliasForm = this.fb.group({
      alias: ['']
    });

    this.loadForm = this.fb.group({
      payer: ['', [Validators.required]],
      biller: ['', [Validators.required]]
    });
    this.findRights();
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {

      if (element.menuName == 'Maintain Accounts') {
        this.accountRights = (element.roles);

      }
    });

    if (this.accountRights.length > 0) {
      this.accountRights.forEach((value) => {

        if (value.role == 'all') {

          this.role.accountsRole = value.status;
        }
      });
    } else {
      this.role.accountsRole = true;
    }


  }

  changeBiller() {
    this.billerc = this.biller.comp_code;
  }

  changePayer() {
    this.payerc = this.payer.comp_code;
  }

  // creating new Accounts

  addNew(): void {
    const formData = this.loadForm.value;
    sessionStorage.setItem('biller_code', this.billerc);
    sessionStorage.setItem('payer_code', this.payerc);

    this.modalService.create({
      nzTitle: 'Create Accounts',
      nzContent: AddAccountsComponent,
      nzFooter: null,
      nzWidth: '80vw'
    });
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
    }
  }

  getTotal() {
    let total = 0;

    this.selected.forEach((value: any) => {
      total += parseFloat(value.amount_due);
    });

    this.slipTotal = total;
  }

  toUploadedFile() {
    this.router.navigate(['admin/uploaded-file-summary']);
  }

  // prime ng refactors

  onRowSelect(value) {
    this.newRow = false;
    this.row = this.cloneRow(value);
    this.displayDialog = true;
  }

  onSelect({ selected }) { }

  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  toEslips() {
    this.router.navigate(['/admin/pay-on-behalf']);
  }

  downloadCSV() {
    const rows = [...this.rows];

    this.excelDownload.buildExcelIviewAccounts('MyAccounts', rows);
  }

  loadAccounts(event) {
    this.loading = true;
    const formData = this.loadForm.value;
    sessionStorage.setItem('biller_code', this.billerc);
    sessionStorage.setItem('payer_code', this.payerc);

    const payload = {
      biller_code: this.billerc,
      payer_code: this.payerc
    };
    const newRows = [];
    this.accountService.fetchAccounts(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
    }),
      (err: any) => {
        this.toastr.error(err.message);
      };
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
        } else if (value.biller_type === "biller" && value.status.toLowerCase() === "active") {
          biller.push(value);
          this.billerLists = biller;
        }
      });
    }),
      (err: any) => {
        this.toastr.error('There is no server connectioin!');
      };
  }
}
