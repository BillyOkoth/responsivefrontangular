import { Component, OnInit } from '@angular/core';
import { NzModalService, UploadFile} from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { ConfirmPayerInsuranceUploadComponent } from '../confirm-payer-insurance-upload/confirm-payer-insurance-upload.component';
import { ArgumentOutOfRangeError } from 'rxjs';
import { CheckOffUploadDialogComponent } from './check-off-upload-dialog/check-off-upload-dialog.component';

@Component({
  selector: 'app-upload-payer-insurance',
  templateUrl: './upload-payer-insurance.component.html',
  styleUrls: ['./upload-payer-insurance.component.css']
})
export class UploadPayerInsuranceComponent implements OnInit {

  selected_Date = '';
  uploadedFiles: any[] = [];
  file_id;
  path;
  selected_file = [];
  file_name;
  fileName: any;
  fileList: any = [];
  roleLists = [];
  loading =  false;
  uploading: boolean;
  insurance_code;
  policy_outliers = [] ;
  constructor(

    private modalService: NzModalService,
    private toastr: ToastrService,
    private excelData: ExcelDataService,
    private billerService: BillerService
  ) { }

  ngOnInit() {

    this.insurance_code = sessionStorage.getItem('biller_code');

  }


  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  fileChange(): void {

    this.file_name = this.fileList[0].name;

    const FileEvent = this.fileList[0];
    this.file_name = this.fileList[0].name;
     this.selected_file.push(this.fileList[0]);

    const reader = new FileReader();

    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];
      sessionStorage.setItem('checkoff64',this.fileName);

    });
    console.log('fileList',this.fileList);
    console.log('fileName',this.fileName);
    console.log('file_name',this.file_name);

    sessionStorage.setItem('CheckoffExel',this.file_name);
    sessionStorage.setItem('CheckOfffileLength',JSON.stringify(this.selected_file));
   
    sessionStorage.setItem('checkoffexcelDate',this.selected_Date);
    sessionStorage.setItem('excelBillerCode',this.insurance_code);

 this.modalService.create({
      nzTitle: 'Confirm  Upload.',
      nzContent: CheckOffUploadDialogComponent,
      nzWidth: '40vW',
      nzFooter: null,
      nzMaskClosable: true,
    });
   

    reader.readAsDataURL(FileEvent);
  }

  cancel() {
    this.modalService.closeAll();
  }


  uploadInvoices() {
    this.uploading = true;
    this.loading = true;
    // file_name: this.file_name,
    const payload = {
      base64Excel : this.fileName,
      date: this.selected_Date,
      biller_code: this.insurance_code
    };
    console.log('p',payload);

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


  // Are you sure you want to proceed.


  downloadSample() {
    console.log('dwnload');
    // this.excelData.multipleIndividualSampleExcel(' Multiple Individual Sample', this.localData);

  }






}
