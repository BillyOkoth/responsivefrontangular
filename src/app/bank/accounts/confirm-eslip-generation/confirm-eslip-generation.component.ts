import { Component, OnInit, Inject } from '@angular/core';


import { Router } from '@angular/router';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';

import { AccountService } from 'src/app/core/services/accounts/account.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-eslip-generation',
  templateUrl: './confirm-eslip-generation.component.html',
  styleUrls: ['./confirm-eslip-generation.component.css'],

})
export class ConfirmEslipGenerationComponent implements OnInit {
  loading = false;
  errormsgs = [];
  disabled = false;
  zeroValues;
  eslipAccounts: any;
  eslipData: any;
  toPayTotal;





  constructor(

    private router: Router,
    private toastr: ToastrService,
    private myaccountsService: MyAccountsService,

    public  accountService: AccountService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {

    this.zeroValues = this.accountService.zeroValuesLength;
    this.eslipAccounts = this.accountService.accountInEslip;
    this.eslipData =  JSON.parse(sessionStorage.getItem('epayload'));

  }

  generateEslip() {
    this.loading = true;
    this.disabled = false;

    this.accountService.generateEslip(this.eslipData).subscribe(
      (response: any) => {
        this.loading = false;
        this.disabled = true;

        if ((response.messageCode = '00')) {
         this.toastr.success(response.message, 'Success');
          setTimeout(() => {
            this.accountService.selectedAccounts = [];
            this.router
              .navigate(['/admin/pay-on-behalf'])
              .then(value => {
                this.myaccountsService.fetchEslipSubject.next(true);
              });
            this.modalService.closeAll();
            this.accountService.selectedTab = '1';
          }, 3000);

          this.timeout();
        } else if ((response.messageCode = '02')) {

          this.toastr.warning(response.message, 'Warning');

          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/admin/pay-on-behalf']);
          }, 3000);
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/admin/pay-on-behalf']);
          }, 3000);
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');

          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/admin/pay-on-behalf']);
          }, 3000);
        }
      },
      (err: any) => {

      }
    );
  }
  timeout() {
    setTimeout(() => {
      this.accountService.selectedTab = '1';
    }, 3000);
  }
  closeDialog() {
    this.modalService.closeAll();
  }
}
