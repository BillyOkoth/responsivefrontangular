import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-accounts',
  templateUrl: './single-accounts.component.html',
  styleUrls: ['./single-accounts.component.scss']
})
export class SingleAccountsComponent implements OnInit {
  billerLists: any;
  loading: boolean;
  payerLists: any;
  accountForm: FormGroup;
  resp: any;
  account_name = '';
  billbalance: any;
  validate = false;
  save: boolean;

  constructor(
    private billerService: BillersService,
    private onboardingService: OnboardingService,
    private fb: FormBuilder,
    private accountsService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchUsers();

    this.accountForm = this.fb.group({
      accountRefNo: ['', [Validators.required]],
      payer_code: [''],

      alias: ['']
    });
  }

  validateAccount() {
    this.validate = true;
    this.loading = true;
    const formData = this.accountForm.value;

    const payload = {
      alias: formData.alias,
      accountRefNo: formData.accountRefNo,
      billerCode: sessionStorage.getItem('biller_code')
    };

    this.accountsService.validateAccount(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.responseCode) {
        case '0':
          this.toastr.success(response.responseMessage, 'Success');
          this.resp = response;
          (this.account_name = response.billDescription),
            (this.billbalance = response.billBalance);
          this.validate = false;
          break;

        default:
          this.toastr.warning(response.responseMessage, 'Warning');
          this.validate = false;
         this.accountForm.reset();
          break;
      }
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }

  saveAccount() {
    this.save = true;
    this.loading = true;
    const formData = this.accountForm.value;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code'),
      due_date: this.resp.dueDate,
      account_no: this.resp.accountRefNo,
      amount_due: this.resp.billBalance,
      alias: formData.alias,
      payer_code: sessionStorage.getItem('payer_code'),
      account_name: this.resp.billDescription
    };

    this.accountsService.saveAccount(payload).subscribe((response: any) => {
      this.loading = false;
      this.save = false;
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message, 'Success');
          (this.billbalance = ''),
            (this.account_name = ''),
            this.accountForm.reset();
          break;

        default:
          this.toastr.warning(response.message, 'Warning');
          break;
      }
    });
  }

  fetchUsers() {
    const payer = [];
    const biller = [];
    const payload = {};
    this.accountsService.fetchAllUsers(payload).subscribe((response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (value.biller_type == 'payer') {
          payer.push(value);
          this.payerLists = payer;
        } else {
          biller.push(value);
          this.billerLists = biller;
        }
      });
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }
}
