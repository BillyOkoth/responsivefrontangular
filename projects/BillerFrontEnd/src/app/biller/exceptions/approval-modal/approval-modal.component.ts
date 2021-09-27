import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BillerService } from '../../services/biller-service/biller.service';

@Component({
  selector: 'app-approval-modal',
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.css']
})
export class ApprovalModalComponent implements OnInit {
  loading: boolean;
  date = '';
  amt = '';
  ref = '';
  tf = '';
  esno = '';

  constructor(
    private eslipService: BillerService,
    private toastr: ToastrService,
  ) { }
  ngOnInit() {
    this.date = this.eslipService.dateCreated;
    this.amt =  this.eslipService.amountFt ;
    this.ref =   this.eslipService.ref;
    this.tf = this.eslipService.ftnumber ;
    this.esno = this.eslipService.eslipnumber ;
  }

  approvePayment() {
    this.loading = true;
    const payload = {
      eslipNo: this.esno
    };

    this.eslipService.approveEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

      if (response.messageCode === '00') {

        this.toastr.success(response.message, 'Success');
      } else if (response.messageCode === '01') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '02') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '06') {
        this.toastr.warning(response.message, 'Warning');
      } else {}

      }, (err: any) => {
        this.loading = false;
      }
    );
  }
  rejectPayment() {
    this.loading = true;
    const payload = {
      eslip_no: this.esno
    };

    this.eslipService.rejectPayment(payload).subscribe(
      (response: any) => {
        this.loading = false;

      if (response.messageCode === '00') {
        this.eslipService.fetchExceptions.next(true);

        this.toastr.success(response.message, 'Success');
      } else if (response.messageCode === '01') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '02') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '06') {
        this.toastr.warning(response.message, 'Warning');
      } else {}

      }, (err: any) => {
       this.loading = false;
      }
    );
  }

  cancel() {

  }

}
