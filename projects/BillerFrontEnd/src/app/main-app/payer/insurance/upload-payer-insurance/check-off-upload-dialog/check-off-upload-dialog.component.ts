import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { Router } from '@angular/router';
import { ConfirmPayerInsuranceUploadComponent } from '../../confirm-payer-insurance-upload/confirm-payer-insurance-upload.component';

@Component({
  selector: 'app-check-off-upload-dialog',
  templateUrl: './check-off-upload-dialog.component.html',
  styleUrls: ['./check-off-upload-dialog.component.css']
})
export class CheckOffUploadDialogComponent implements OnInit {
  testData;
  uploading: boolean;
  loading =  false;
  selected_file = [];
  selected_Date = '';
  uploadedFiles: any[] = [];
  file_id;
  path;
  file_name;
  fileName: any;
  fileList: any = [];
  roleLists = [];
  insurance_code;
  policy_outliers = [] ;
  constructor(

    private modalService: NzModalService,
    private toastr: ToastrService,
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
   this.testData = sessionStorage.getItem('CheckoffExel');
   this.selected_file =JSON.parse(sessionStorage.getItem('CheckOfffileLength')) ;
    sessionStorage.getItem('checkoff64');
    this.selected_Date = sessionStorage.getItem('checkoffexcelDate');
    sessionStorage.getItem('excelBillerCode',);

  }

  uploadInvoices() {
    this.uploading = true;
    this.loading = true;
    // file_name: this.file_name,
    const payload = {
      base64Excel : sessionStorage.getItem('checkoff64'),
      date:  sessionStorage.getItem('checkoffexcelDate'),
      biller_code: sessionStorage.getItem('biller_code')
    };

    sessionStorage.setItem('selecteddate', this.selected_Date);


    this.billerService.payerUploadCheckOffPolicy(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');


          console.log('comparison', response);

          this.policy_outliers = response.policies;
          sessionStorage.setItem('outliers', JSON.stringify(this.policy_outliers));
          this.policy_outliers.forEach((value: any) => {

            sessionStorage.setItem('outlier_name', value.name);
            sessionStorage.setItem('outlier_amount', value.amount);
            sessionStorage.setItem('outlier_policyNo', value.policy_no);

            sessionStorage.setItem('outlier_amountStatus', value.amount_status);
            sessionStorage.setItem('outlier_policyStatus', value.policy_holder_status);

          });



          this.file_id = response.file_id;
          this.path = response.path;
          sessionStorage.setItem('selectedFile', this.file_id);
          sessionStorage.setItem('selectedPath', this.path);

          this.modalService.closeAll();
          this.modalService.create({
            nzTitle: 'Payer Confirmation.',
            nzContent: ConfirmPayerInsuranceUploadComponent,
            nzWidth: '50vw',
            nzFooter: null
          });

        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {}

      }
    );

  }

  handleCancel(){
    this.modalService.closeAll();
  }



  

}
