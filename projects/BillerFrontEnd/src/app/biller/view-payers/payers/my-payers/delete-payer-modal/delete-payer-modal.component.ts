import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-payer-modal',
  templateUrl: './delete-payer-modal.component.html',
  styleUrls: ['./delete-payer-modal.component.css']
})
export class DeletePayerModalComponent implements OnInit {

  payer;
  compCode;
  loading = false;
  constructor(
    private modalService: NzModalService,
    private billerService: BillerService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.compCode = sessionStorage.getItem('deletePayerCode');
    this.payer = sessionStorage.getItem('deletePayerName');
  }


  closeDialog() {
    this.modalService.closeAll();

  }

  deletePayer() {
    this.loading = true;

    const payload = {
      comp_code: this.compCode
    };
    this.billerService.deletePayer(payload).subscribe(
      (response: any) => {
        this.loading = false;
        switch (response.responseCode) {
          case '00':
            this.toastr.success(response.message, 'Success');
            this.billerService.payerSubject.next(true);
            this.modalService.closeAll();
            break;
          case '02':
            this.toastr.warning(response.message, 'Warning');
            break;
          case '02':
            this.toastr.warning(response.message, 'Warning');
            break;
          case '02':
            this.toastr.warning(response.message, 'Warning');
            break;
            default:
              this.toastr.warning(response.warning, 'Warning');
        }
      }
    );

  }



}
