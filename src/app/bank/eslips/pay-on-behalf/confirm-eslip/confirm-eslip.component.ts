import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-confirm-eslip',
  templateUrl: './confirm-eslip.component.html',
  styleUrls: ['./confirm-eslip.component.css']
})
export class ConfirmEslipComponent implements AfterViewInit {
  loading = false;
  accountsCount: string;
  errormsgs = [];
  disabled = false;
  toPayTotal;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private eslipService: EslipsService,
    private modalService: NzModalService,
    public role: RolesService
  ) {}

  ngOnInit() {
    this.accountsCount = this.accountService.accountsSelected.toString();
  }

  ngAfterViewInit() {}

  generateEslip() {
    this.loading = true;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code'),
      path: this.accountService.path,
      account_to_add: this.accountService.oddCentAccount,
      oddcent: this.accountService.oddCentAmount.toString(),
      payer_code: sessionStorage.getItem('payer_code')
    };

    this.eslipService.generateEslipAuto(payload).subscribe((response: any) => {
      this.disabled = true;
      if ((response.messageCode = '00')) {
        this.toastr.success(response.message, 'Success');
        setTimeout(() => {
          this.closeDialog();
          this.router.navigate(['/admin/pay-on-behalf']);
          this.loading = false;
        }, 3000);
      } else if ((response.messageCode = '02')) {
        this.toastr.warning(response.message, 'Warning');
        setTimeout(() => {
          this.closeDialog();
          this.router.navigate(['/admin/pay-on-behalf']);
          this.loading = false;
        }, 3000);
      } else if ((response.messageCode = '03')) {
        this.toastr.warning(response.message, 'Warning');
        setTimeout(() => {
          this.closeDialog();
          this.router.navigate(['/admin/pay-on-behalf']);
          this.loading = false;
        }, 3000);
      } else if ((response.messageCode = '07')) {
        this.toastr.warning(response.message, 'Warning');
        setTimeout(() => {
          this.closeDialog();
          this.router.navigate(['/admin/pay-on-behalf']);
          this.loading = false;
        }, 3000);
      }
    });
  }

  closeDialog() {
    this.modalService.closeAll();
  }
}
