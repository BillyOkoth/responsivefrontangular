import { Component, OnInit, Inject } from '@angular/core';

import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { Router } from '@angular/router';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';

import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';

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

  constructor(

    public loginService: LoginService,
    private router: Router,
    private myaccountsService: MyAccountsService,

    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {

    this.zeroValues = this.loginService.zeroValuesLength;
    this.eslipAccounts = this.loginService.accountInEslip;
    this.eslipData = JSON.parse(sessionStorage.getItem('eslip-payload'));
  }

  generateEslip() {
    this.loading = true;
    this.disabled = false;

    this.loginService.generateEslip(this.eslipData).subscribe(
      (response: any) => {
        this.loading = false;
        this.disabled = true;

        if ((response.messageCode = '00')) {
          this.toastr.success(response.message, 'Success');
          setTimeout(() => {
            this.loginService.selectedAccounts = [];
            this.router
              .navigate(['/app/dashboard/generated-e-slip'])
              .then(value => {
                this.myaccountsService.fetchEslipSubject.next(true);
              });
            this.closeDialog();
            this.loginService.selectedTab = '1';
          }, 3000);

          this.timeout();
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/app/dashboard/generated-e-slip']);
          }, 3000);
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');

          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/app/dashboard/generated-e-slip']);
          }, 3000);
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/app/dashboard/generated-e-slip']);
          }, 3000);
        }
      },
      (err: any) => {

      }
    );
  }
  timeout() {
    setTimeout(() => {
      this.loginService.selectedTab = '1';
    }, 3000);
  }
  closeDialog() {
    this.modalService.closeAll();
  }
}
