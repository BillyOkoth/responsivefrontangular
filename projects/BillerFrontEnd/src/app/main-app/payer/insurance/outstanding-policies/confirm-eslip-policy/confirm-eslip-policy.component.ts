import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';

@Component({
  selector: 'app-confirm-eslip-policy',
  templateUrl: './confirm-eslip-policy.component.html',
  styleUrls: ['./confirm-eslip-policy.component.css']
})
export class ConfirmEslipPolicyComponent implements OnInit {
  loading = false;
  errormsgs = [];
  disabled = false;
  zeroValues;
  eslipAccounts: any;
  eslipData: any;
  insurance_code;


  constructor(

    public billerService: BillerService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private myaccountsService: MyAccountsService,
  ) { }

  ngOnInit() {
    this.insurance_code = sessionStorage.getItem('biller_code');
    this.zeroValues = this.billerService.zeroValuesLength;
    this.eslipAccounts = this.billerService.accountInEslip;
    this.eslipData = JSON.parse(sessionStorage.getItem('Policypayload'));
  }

  generateEslip() {
    this.loading = true;
    this.disabled = false;

    this.billerService.generateEslipPolicy(this.eslipData).subscribe(
      (response: any) => {
        this.loading = false;
        this.disabled = true;

        if ((response.messageCode = '00')) {
          this.toastr.success(response.message, 'Success');

          setTimeout(() => {
            this.router
              .navigate(['/app/dashboard/generated-e-slip'])
              .then(value => {
                this.myaccountsService.fetchEslipSubject.next(true);
              });
            this.closeDialog();
            // this.billerService.selectedTab = '1';
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

  closeDialog() {
    this.modalService.closeAll();
  }

  timeout() {
    setTimeout(() => {
      this.billerService.selectedTab = '1';
    }, 3000);
  }

}
