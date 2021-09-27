import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import {
  Bill,
  BillingAccount,
  AccountDetailsReq,
  SaveAccount,
  Excel,
  getMyUploadedFiles
} from '../../../../service/login.model';


import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-open-biller-admin',
  templateUrl: './open-biller-admin.component.html',
  styleUrls: ['./open-biller-admin.component.css']
})
export class OpenBillerAdminComponent implements OnInit {

  constructor(
    private router: Router,
    private billService: LoginService,
    private fb: FormBuilder,

    private http: HttpClient,
    private toastr: ToastrService,
    private myaccountsService: MyAccountsService,
    private modalService: NzModalService
  ) {}
  billbalance;
  accNo;
  descBill;
  DueDate;
  Info;
  fileName: string;

  biller_code;
  created_at;
  file_id;

  payer_code;
  pending;
  total;
  validated;
  progress;

  filePreview: string;
  loading = false;

  formula = 'Formula 1';

  account_number = '';
  account_name: any;
  amount_due: any;
  due_date: any;
  successFullAccounts = [];
  alias = '';

  disabled = false;
  background = 'accent';
  primary = '#022E86';
  selectedTab = 0;

  // the Query Form
  billQueryForm: FormGroup;
  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

  ngOnInit() {
    this.billQueryForm = this.fb.group({
      accountnumber: ['', Validators.required],
      billercode: ['', Validators.required],
      billerurl: ['', Validators.required],
      alias: [''],
      account_name: ['']
    });
    this.billService.showBackgroundShadow = true;

    this.disabled = true;
  }



  // save account details
  saveDetails(formData: any) {
    if (this.account_number != '') {
      const account: SaveAccount = {
        account_name: this.account_name,
        amount_due: this.billbalance,
        due_date: this.DueDate,
        account_no: this.account_number,
        alias: this.alias
      };

      this.successFullAccounts.push(account);
      this.toastr.success(' You  have succesfully Saved an Account!');

      this.account_name = '';
      this.amount_due = '';
      this.due_date = '';
      this.account_number = '';
      this.alias = '';
    } else {
      this.toastr.warning('You need to add Accounts  !');
    }
  }

  excelQuery(): void {
    const payload: getMyUploadedFiles = {
      biller_code: sessionStorage.getItem('biller_code')
    };

    this.loading = true;
    this.billService.fetchUploadFiles(payload).subscribe(response => {
      this.loading = false;

      response.forEach((value: any) => {
        this.billService.progress = value.progress;
        this.billService.validated = value.validated;
        this.billService.total = value.total;
        this.billService.created_at = value.created_at;
        this.billService.file_id = value.file_id;
        this.billService.file_name = value.file_name;
        this.billService.pending = value.pending;
      });
    }),
      (err: any) => {

      };
  }

  toMyAccounts() {

    this.router.navigate(['/app/dashboard/view-my-accounts']).then(value => {
      this.myaccountsService.fetchAccountsSubject.next(true);
    });
  }
}
