import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../../../../service/login.service';
import {
  Bill,
  AccountDetailsReq,
  SaveAccount
} from '../../../../../service/login.model';

import { MyAccountsService } from '../../../../../service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css'],
})
export class SingleAccountComponent implements OnInit {
  billbalance;
  accNo;
  Info;
  billQueryForm: FormGroup;
  account_number = '';
  account_name: any;
  amount_due: any;
  due_date: any;
  successFullAccounts = [];
  alias = '';

  loading = false;
  disabled = false;

  msgs = [];
  validate: boolean;
  save: boolean;

  constructor(
    private billService: LoginService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private myaccountsService: MyAccountsService
  ) {}

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

  validateAccount(): void {
    this.disabled = false;
    this.loading = true;
    this.validate = true;
    const payload: Bill = {
      accountRefNo: this.account_number,
      billerCode: sessionStorage.getItem('biller_code')
    };

    this.billService.billQuery(payload).subscribe(
      response => {
        this.loading = false;
        this.validate = false;

        if (response.responseCode == '0') {
          this.toastr.success(response.message, 'Success');
          this.accNo = response.accountRefNo;
          this.account_name = response.billDescription;
          this.billbalance = response.billBalance;

          this.Info = response.otherInfomation;
          this.due_date = response.dueDate;

          this.billbalance = response.billBalance;
          this.billService.accountNumber = response.accountRefNo;
          this.billService.billDesc = response.billDescription;
          this.billService.billBal = response.billBalance;
          this.billService.billDueDate = response.dueDate;
          this.billService.otherInfo = response.otherInfomation;
          this.billService.responseCode = response.responseCode;
          this.billService.responseMessage = response.responseMessage;
        } else if (response.responseCode === '02') {
          this.toastr.warning(response.responseMessage, 'Warning');
          this.account_name = '';
          this.amount_due = '';
          this.due_date = '';
          this.account_number = '';
          this.alias = '';
          this.billbalance = '';
          this.disabled = true;
          this.validate = false;

        }
      },
      (err: any) => {

      }
    );
  }

  // fetch account details
  fetchDetails(event: any) {
    const payload: AccountDetailsReq = {
      accountRefNo: event.target.value,
      billerCode: sessionStorage.getItem('biller_code')
    };
    this.billService.fetchAccountDetails(payload).subscribe(
      (response: any) => {
        this.account_name = response.billDescription;
        this.amount_due = response.billBalance;
        this.due_date = response.dueDate;
      },
      (err: any) => {

      }
    );
  }

  saveToAccounts() {
    const account: SaveAccount = {
      account_name: this.accNo,
      amount_due: this.billbalance,
      due_date: this.due_date,
      account_no: this.account_number,
      alias: this.alias
    };

    this.successFullAccounts.push(account);

    if (this.successFullAccounts.length > 0) {
      const payload = {
        biller_code: sessionStorage.getItem('biller_code'),
        account_name: this.account_name,
        amount_due: this.billbalance,
        due_date: this.due_date,
        account_no: this.account_number,
        alias: this.alias
      };
      this.loading = true;
      this.save = true;
      this.billService
        .createBillingAccount(payload)
        .subscribe((response: any) => {
          this.disabled = true;
          this.loading = false;
          this.save = false;
          this.successFullAccounts = [];
          this.myaccountsService.fetchAccountsSubject.next(true);
          this.toastr.success(response.message, 'Success');
          this.account_name = '';
          this.amount_due = '';
          this.due_date = '';
          this.account_number = '';
          this.alias = '';
          this.billbalance = '';
          this.msgs = [];
          this.disabled = true;
        });
    } else { this.toastr.warning('Please add an Account !'); }
  }


}
