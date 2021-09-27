import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BillerService } from '../../services/biller-service/biller.service';

@Component({
  selector: 'app-pay-eslip',
  templateUrl: './pay-eslip.component.html',
  styleUrls: ['./pay-eslip.component.css']
})
export class PayEslipComponent implements OnInit {

  constructor(
    private eslipService: BillerService,
    private toastr: ToastrService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,

  ) { }
  loading: boolean;
  validationBoolean: boolean;
  eslipNo = '';
  amountToPay = '';

  dateCreated = '';
  amount = '';
  reference = '';
  ft = '';
  ID = '';
  eslip_amount = '';
  biller_name = '';
  payer_name = '';
  accounts = '';
  eslip_no = '';
  payEslipForm = new FormGroup({

    eslip_no: new FormControl(''),


  });
  validateEslipForm = new FormGroup({

    eslipno: new FormControl(''),


  });

  ngOnInit() {

    this.dateCreated = sessionStorage.getItem('datecreated');
    this.eslipNo = sessionStorage.getItem('eslipNO');
    this.reference = sessionStorage.getItem('reference');
    this.ft = sessionStorage.getItem('ft');
    this.amount = sessionStorage.getItem('valueamount');
    this.ID = sessionStorage.getItem('ID');

    this.payEslipForm = this.fb.group({

      eslip_no: ['', Validators.required]

    });
    this.validateEslipForm = this.fb.group({

      eslipno: ['', Validators.required]

    });
  }
  payEslip() {

    this.loading = true;

    const payload = {
      eslipNo: this.eslip_no,
      paymentRefNo: this.reference,
      paidAmount: this.amount,
      paymentDate: this.dateCreated,
      id: this.ID,
      ft: this.ft
    };

    this.eslipService.payEslip(payload).subscribe(
      (response: any) => {

        this.loading = false;
        if (response.messageCode === '00') {

          this.toastr.success(response.message, 'Success');
          this.eslipService.fetchExceptions.next(true);
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else { }
      }, (err: any) => {

        this.loading = false;
      }
    );


  }

  ignore() {
    const payload = {
      id: this.ID,
    };
    this.loading = true;
    this.eslipService.ignoreExceptionLogs(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode === '00') {

          this.toastr.success(response.message, 'Success');
          this.eslipService.fetchExceptions.next(true);
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else { }
      }, (err: any) => {
        this.loading = false;


      }
    );
  }

  validateEslip() {
    // validateEslipForm
    const formData = this.validateEslipForm.value;
    if (this.validateEslipForm.valid) {
      const payload = {
        eslipNo: formData.eslipno
      };
      this.loading = true;
      this.eslipService.validateEslip(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode === '02') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '06') {

            this.toastr.warning(response.message, 'Warning');
          } else if (response[0].messageCode === '00') {
            this.validationBoolean = true;
            this.toastr.success(response[0].message, 'Success');
            this.eslip_amount = response[0].eslip_amount;
            this.eslip_no = response[0].eslip_no;
            this.biller_name = response[0].biller_name;
            this.payer_name = response[0].payer_name;
            this.accounts = response[0].accounts;

          } else { }
        }

      );
    }

  }

}
