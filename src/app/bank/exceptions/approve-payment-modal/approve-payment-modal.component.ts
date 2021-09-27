import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-approve-payment-modal',
  templateUrl: './approve-payment-modal.component.html',
  styleUrls: ['./approve-payment-modal.component.scss']
})
export class ApprovePaymentModalComponent implements OnInit {

  loading = false;
  eslipnumber;
  ref_number;
  eslipAmount;
  eslipPayer;
  eslipFt;

  constructor(
    private eslipService: EslipsService,
    private toastr: ToastrService,
    private modalService: NzModalService,

  ) { }

  ngOnInit() {
    this.eslipnumber =  sessionStorage.getItem('approveeslipnumber');
   this.eslipAmount =  sessionStorage.getItem('approveeslipamount');
   this.ref_number = sessionStorage.getItem('approveeslipref');
   this.eslipPayer =  sessionStorage.getItem('approveepayer');
   this.eslipFt =   sessionStorage.getItem('ft-approve');
  }
closeDialog() {

this.modalService.closeAll();
}

  approvePayments() {

    sessionStorage.getItem('approveeslipnumber');

    this.loading = true;
    const payload = {
      eslipNo: sessionStorage.getItem('approveeslipnumber')
    };

    this.eslipService.approveEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.eslipService.fetchExceptions.next(true);
          this.modalService.closeAll();
          this.toastr.success(response.message, 'Success');

        } else if (response.messageCode === '10') {

          this.eslipService.fetchExceptions.next(true);
          this.toastr.success(response.message, 'Success');
          this.modalService.closeAll();

        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      (err: any) => {}
    );

  }

}
