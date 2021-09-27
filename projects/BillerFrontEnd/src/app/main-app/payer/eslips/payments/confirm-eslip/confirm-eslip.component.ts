import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { Router } from '@angular/router';
import { EslipAuto } from 'projects/BillerFrontEnd/src/app/service/login.model';
import { GeneratedESlipComponent } from '../../generated-e-slip/generated-e-slip.component';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';

@Component({
  selector: 'app-confirm-eslip',
  templateUrl: './confirm-eslip.component.html',
  styleUrls: ['./confirm-eslip.component.css']
})
export class ConfirmEslipComponent implements OnInit {
  // @ViewChild(GeneratedESlipComponent, { static: false })
  viewChild: GeneratedESlipComponent;
  loading = false;
  accountsCount: string;
  errormsgs = [];
  disabled = false;

  constructor(
    public loginService: LoginService,
    private myaccountsService: MyAccountsService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.accountsCount = this.loginService.accountsSelected.toString();
  }

  // ngAfterViewInit() {}

  generateEslip() {
    this.loading = true;
    const payload: EslipAuto = {
      biller_code: sessionStorage.getItem('biller_code'),
      path: this.loginService.path,
      account_to_add: this.loginService.oddCentAccount,
      oddcent: this.loginService.oddCentAmount.toString()
    };

    this.loginService.generateEslipAuto(payload).subscribe((response: any) => {
      this.loading = false;
      this.disabled = true;
      if ((response.messageCode = '00')) {
        this.toastr.success(response.message, 'Success');
        this.myaccountsService.fetchEslipSubject.next(true);
        setTimeout(() => {
          this.closeDialog();
          this.router.navigate(['/app/dashboard/generated-e-slip']);
          this.loginService.selectedTab = '1';
        }, 3000);
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
    });
  }

  closeDialog() {
    this.modalService.closeAll();
  }
}
