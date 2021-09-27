import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { PayerUploadTabComponent } from '../payer-upload-tab/payer-upload-tab.component';

@Component({
  selector: 'app-payer-insurance-mapping',
  templateUrl: './payer-insurance-mapping.component.html',
  styleUrls: ['./payer-insurance-mapping.component.css']
})
export class PayerInsuranceMappingComponent implements OnInit {

  payerColumns;
  rows;
  data = [];
  loading;
  payer_amount;
  policy_number;
  allInvoiceMapList: any[];
  columns = [];
  insurance_code;
  payer_date;
  payer_name;

  constructor(
    private fb: FormBuilder,
    public billerService: BillerService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.insurance_code = sessionStorage.getItem('biller_code');
    sessionStorage.setItem('fetchedColumns', JSON.stringify(this.columns));

    // this.columns = JSON.parse(sessionStorage.getItem("fetchedColumns"))

    this.columns = this.billerService.payer_insurance_columns;

    this.payerColumns = this.fb.group({

      amount: ['', [Validators.required]],
      policy_no: ['', [Validators.required]],
      date: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
this.billerService.policyMappingSubject.subscribe(
  (value) => {
    this.payerGetPolicyMapping();
  }
);


  }

  payerGetPolicyMapping() {


    const payload = {
      biller_code:  this.insurance_code,
    };

    this.billerService.payerGetPolicyMapping(payload).subscribe(
      (response: any) => {

        console.log('insurance_res', response);

        if (response.length > 0) {
          this.payer_amount = response[0].amount;
          this.payer_date = response[0].date;
          this.policy_number = response[0].policy_no;
          this.payer_name = response[0].name;

        }

      }
    );
  }

  saveColumns() {

    this.loading = true;

    const payload = {
      policy_no: this.policy_number,
      date: this.payer_date,
      amount: this.payer_amount,
      name: this.payer_name,
      biller_code: this.insurance_code

    };


    this.billerService.payerSetPolicyMapping(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          this.modalService.closeAll();
          this.billerService.payerPolicyUpdateSubject.next(true);

          this.modalService.create({
            nzTitle: 'Upload Policies.',
            nzContent: PayerUploadTabComponent,
            nzWidth: '80vw',
            nzFooter: null
          });


          // setTimeout(() => {
          //   this.modalService.closeAll();
          // }, 2000);
          // break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }

}
