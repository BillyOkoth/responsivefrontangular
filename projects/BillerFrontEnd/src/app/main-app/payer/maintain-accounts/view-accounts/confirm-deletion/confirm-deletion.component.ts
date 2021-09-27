import { Component, OnInit } from '@angular/core';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';

import { ToastrService } from 'ngx-toastr';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.css']
})
export class ConfirmDeletionComponent implements OnInit {
  loading: boolean;
  tplModal: NzModalRef;

  constructor(
    public myAccountsService: MyAccountsService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}
  accountsToDelete;
  ngOnInit() {
    this.accountsToDelete = this.myAccountsService.selectedAccounts.length;
  }

  deleteMultiple() {
    this.loading = true;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code'),
      accounts: this.myAccountsService.selectedAccounts
    };

    this.myAccountsService.deleteMultipleAccounts(payload).subscribe(
      (response: any) => {
        if ((response.messageCode = '00')) {
          this.loading = false;

          // this.tplModal.close()
          // this.modalService.closeAll();
          // this.myAccountsService.selectedAccounts = [];
          this.toastr.success(response.message, 'Success');
          this.closeDialog();
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
          this.tplModal.close();
        } else {
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
          this.tplModal.close();
        }
      },
      (err: any) => {
        this.toastr.error('There is no server  connection !');
      }
    );
  }

  closeDialog() {
    this.modalService.closeAll();

    this.myAccountsService.selectedAccounts = [];

    this.myAccountsService.fetchAccountsSubject.next(true);
  }
}
