import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-payer-insurance-upload',
  templateUrl: './confirm-payer-insurance-upload.component.html',
  styleUrls: ['./confirm-payer-insurance-upload.component.css']
})
export class ConfirmPayerInsuranceUploadComponent implements OnInit {
  loading = false;
  insurance_code;
  aa = false;
  fileId;
  filePath;
  selectedDate;
  outlier_name;
  outlier_amount;
  outlier_policyNo;
  amountStatus;
  policyStatus;
  rows = [];

  constructor(
    private modalService: NzModalService,
    private toastr: ToastrService,
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit() {

    this.insurance_code = sessionStorage.getItem('biller_code');
    this.selectedDate = sessionStorage.getItem('selecteddate');
    this.fileId = sessionStorage.getItem('selectedFile');
    this.filePath = sessionStorage.getItem('selectedPath');

    // session

   this.rows =  JSON.parse(sessionStorage.getItem('outliers'));
    // this.rows = JSON.parse(JSON.stringify('outliers'));
    console.log('rows', this.rows);
    // this.outlier_name = sessionStorage.getItem('outlier_name');
    // this.outlier_amount = sessionStorage.getItem('outlier_amount');
    // this.outlier_policyNo = sessionStorage.getItem('outlier_policyNo');

    // this.amountStatus = sessionStorage.getItem('outlier_amountStatus');
    // this.policyStatus = sessionStorage.getItem('outlier_policyStatus');

  }


  confirmPayers() {

    this.loading = true;
    const payload = {
      biller_code: this.insurance_code,
      date: this.selectedDate,
      file_id: this.fileId,
      path: this.filePath
    };
    this.billerService.payerProceedPolicy(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode === '00') {
          console.log('confirm', response);
          this.router.navigate(['/app/dashboard/insurance']);
          this.billerService.selectedTab = '2';

          this.toastr.success(response.message, 'Succe<ss');
          this.modalService.closeAll();
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else { }

      }
    );

  }

  closeDialog() {
    this.modalService.closeAll();
  }
  setIndex(ii) {
    this.aa = ii;
  }

}
