import { Component, OnInit } from '@angular/core';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { Router } from '@angular/router';
import { PensionConfirmDialogComponent } from './pension-confirm-dialog/pension-confirm-dialog.component';

@Component({
  selector: 'app-umbrella-fund-policy',
  templateUrl: './umbrella-fund-policy.component.html',
  styleUrls: ['./umbrella-fund-policy.component.css']
})
export class UmbrellaFundPolicyComponent implements OnInit {

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
    private billerService: BillerService,
    private router: Router
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


    });
    console.log('fileList',this.fileList);
    console.log('fileName',this.fileName);
    console.log('file_name',this.file_name);

    sessionStorage.setItem('pensionExel',this.file_name);
    sessionStorage.setItem('fileLength',JSON.stringify(this.selected_file));
    sessionStorage.setItem('excel64',this.fileName);
    sessionStorage.setItem('excelDate',this.selected_Date);
    sessionStorage.setItem('excelBillerCode',this.insurance_code);

 this.modalService.create({
      nzTitle: 'Confirm  Upload.',
      nzContent: PensionConfirmDialogComponent,
      nzWidth: '40vW',
      nzFooter: null,
      nzMaskClosable: true,
    });
   
    reader.readAsDataURL(FileEvent);
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

    this.billerService.payerUploadUmbrellaPolicy(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/app/dashboard/pensions']);

          this.billerService.selectedTab = '2';
          this.modalService.closeAll();
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {}

      }
    );

  }

  downloadSample() {
    console.log('dwnload');
    // this.excelData.multipleIndividualSampleExcel(' Multiple Individual Sample', this.localData);
  }



}
