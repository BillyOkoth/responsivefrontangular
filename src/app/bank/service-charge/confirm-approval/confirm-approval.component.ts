import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-approval',
  templateUrl: './confirm-approval.component.html',
  styleUrls: ['./confirm-approval.component.scss']
})
export class ConfirmApprovalComponent implements OnInit {
  loading = false;
  accounts: any;

  constructor(
    public accountService: AccountService,
    private toastr: ToastrService,
    private eslipsService: EslipsService,
    private destroy: NzModalService
  ) {}
  ngOnInit() {

    this.accounts = this.eslipsService.pendingCharges.length;
  }

  closeDialog() {

  }

  approveCharges() {
    this.loading = true;
    const payload = {
      eslips: this.eslipsService.pendingCharges
    };
    this.eslipsService
      .updateServiceCharge(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.eslipsService.selectedTab = 1;
        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Warning');
          this.destroy.closeAll();
          this.eslipsService.fetchPendingCharges.next(true);

        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
          this.destroy.closeAll();
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
          this.destroy.closeAll();
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
          this.destroy.closeAll();
        } else if (response.messageCode === '07') {
          this.toastr.warning(response.message, 'Warning');
          this.destroy.closeAll();
        } else {}


      });
  }
}
