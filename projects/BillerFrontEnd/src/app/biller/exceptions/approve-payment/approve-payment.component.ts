import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BillerService } from '../../services/biller-service/biller.service';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-approve-payment',
  templateUrl: './approve-payment.component.html',
  styleUrls: ['./approve-payment.component.css']
})
export class ApprovePaymentComponent implements OnInit {

  loading: boolean;
  loadForm: FormGroup;
  billerLists: any;
  aa = false;

  payerLists: any;
  selectedEslip = '';
  searchValue = '';
  approved: any;
  rows = [];
  cols = [];

  constructor(
    private toastr: ToastrService,

    private fb: FormBuilder,
    private eslipService: BillerService,
    private modalService: NzModalService

  ) { }

  ngOnInit() {
    this.eslipService.fetchExceptions.subscribe(value => {
      this.getExceptions();
    }
    );

    this.loadForm = this.fb.group({
      biller: [''],
      payer: ['']
    });
    this.loadForm = this.fb.group({
      payer: ['', [Validators.required]],
      biller: ['', [Validators.required]]
    });

    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'amount', header: 'Amount' },
      { field: 'reference', header: 'Reference' },
      { field: 'ft', header: 'FT' },
      { field: 'eslip_no', header: 'EslipNo' }
    ];


  }

  approvePayment(value) {
    this.loading = true;
    const payload = {
      eslipNo: value.eslip_no
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
  rejectPayment(value) {
    this.loading = true;
    const payload = {
      eslip_no: value.eslip_no
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


  getExceptions() {
    this.loading = true;
    const ApproveExceptions = [];
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe(
      (response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (
          value.status == 'InProgress') {
            ApproveExceptions.push(value);
        }
      });
      this.rows = ApproveExceptions;
    });
  }
  reconcilePayments(value) {
   this.eslipService.dateCreated = value.created_at;
   this.eslipService.eslipnumber = value.eslip_no;
   this.eslipService.ref = value.reference;
   this.eslipService.ftnumber = value.ft;
   this.eslipService.amountFt = value.amount;


   this.modalService.create({
    nzTitle: 'Reconciliation.',
    nzContent: ApprovalModalComponent,
    nzWidth: '40vw',
    nzFooter: null
  });




  }


  setIndex(ii) {
    this.aa = ii;

  }
}
