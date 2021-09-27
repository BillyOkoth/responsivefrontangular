import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-service-charge-approval',
  templateUrl: './confirm-service-charge-approval.component.html',
  styleUrls: ['./confirm-service-charge-approval.component.scss']
})
export class ConfirmServiceChargeApprovalComponent implements OnInit {
  loading = false;
  year;
  month;
  constructor(
    private modalService: NzModalService,
    private eslipService: EslipsService,
    private toastr: ToastrService,
    private ref: NzModalRef
  ) { }

  ngOnInit() {

    this.year = sessionStorage.getItem('confirmYear');
    this.month = sessionStorage.getItem('confirmMonth');

  }

  closeDialog() {
    this.modalService.closeAll();
  }

  ApproveServiceCharge() {

    this.loading = true;

    const payload = {
      year: sessionStorage.getItem('confirmYear'),
      month: sessionStorage.getItem('confirmMonth')
    };

    this.eslipService.updateServiceCharge(payload).subscribe(
      (response: any) => {
        
        this.loading = false;
        this.ref.close()
        switch (response.messageCode) {
          case '00':
            this.toastr.success('Success', response.message);
            this.eslipService.fetchPendingCharges.next(true);

            break;
          case '02':
            this.toastr.warning('Warning', response.message);
            break;
          case '06':
            this.toastr.warning('Warning', response.message);
            break;
          case '08':
            this.toastr.warning('Warning', response.message);
            break;
          default:
            this.toastr.warning('Warning', response.message);
            break;

        }
      }
    );

  }


}
