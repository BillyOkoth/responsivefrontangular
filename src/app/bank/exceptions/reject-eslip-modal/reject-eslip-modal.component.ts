import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-eslip-modal',
  templateUrl: './reject-eslip-modal.component.html',
  styleUrls: ['./reject-eslip-modal.component.scss']
})
export class RejectEslipModalComponent implements OnInit {

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

    this.eslipnumber =  sessionStorage.getItem('rejectlipnumber');
    this.eslipAmount =  sessionStorage.getItem('rejectlipamount');
    this.ref_number = sessionStorage.getItem('rejectlipref');
    this.eslipPayer =  sessionStorage.getItem('rejectpayer');
    this.eslipFt =   sessionStorage.getItem('ft-reject');
  }
closeDialog() {

this.modalService.closeAll();
}

rejectEslip() {



    this.loading = true;
    const payload = {
      eslipNo: sessionStorage.getItem('rejectlipnumber')
    };

    this.eslipService.rejectEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
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
