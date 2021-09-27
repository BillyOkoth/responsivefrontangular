import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';

@Component({
  selector: 'app-dispute-invoice-modal',
  templateUrl: './dispute-invoice-modal.component.html',
  styleUrls: ['./dispute-invoice-modal.component.css']
})
export class DisputeInvoiceModalComponent implements OnInit {

  disputeInvoice;
  remarks = '';
  loading = false;
  constructor(
    private toastr: ToastrService,
    private modalService: NzModalService,
    private billerService: BillerService,

  ) { }

  ngOnInit() {

    this.disputeInvoice = sessionStorage.getItem('InvoiceCode');
  }

  getDisputeInvoice() {

    this.loading = true;
    const payload = {
      invoice: sessionStorage.getItem('InvoiceCode'),
      biller_code: sessionStorage.getItem('biller_code'),
      remarks: this.remarks
    };
    console.log('re', payload);

    this.billerService.disputeInvoice(payload).subscribe(
      (response: any) => {
      this.loading = false;
      if (response.messageCode === '00') {
        this.billerService.disputeInvoiceSubject.next(true);
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

    });
  }

  closeDialog() {

    this.modalService.closeAll();

  }

}
