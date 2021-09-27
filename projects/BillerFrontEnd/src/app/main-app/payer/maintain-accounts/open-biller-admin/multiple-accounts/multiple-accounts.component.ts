import { Component, OnInit } from '@angular/core';
import { Excel } from '../../../../../service/login.model';
import { LoginService } from '../../../../../service/login.service';

import { Router } from '@angular/router';
import { MyAccountsService } from '../../../../../service/my-accounts service/my-accounts.service';
import { ExcelDataService } from '../../../../../service/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFile, NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-multiple-accounts',
  templateUrl: './multiple-accounts.component.html',
  styleUrls: ['./multiple-accounts.component.css']
})
export class MultipleAccountsComponent implements OnInit {
  constructor(
    private billService: LoginService,
    private excelDownload: ExcelDataService,
    private router: Router,
    public myaccountsService: MyAccountsService,
    private toastr: ToastrService,
    private msg: NzMessageService,
    private modalService: NzModalService
  ) {}
  msgs = [];
  file_name;
  fileName: any;
  loading = false;
  disabled = true;
  selected_file = [];
  uploading = false;
  fileList: any = [];
  base_file: any;
  hello: string;

  public localData = [
    {
      Accountno: '000100000'
    }
  ];

  ngOnInit() {}

  fileChange(): void {
    this.file_name = this.fileList[0].name;
    const FileEvent = this.fileList[0];

    const reader = new FileReader();
    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];
    });
    reader.readAsDataURL(FileEvent);
  }

  /**
   * @description:: save uploaded bills in the system
   */
  uploadAccounts() {
    this.uploading = true;
    this.file_name = this.fileList[0].name;
    const payload: Excel = {
      file_name: this.file_name,
      base64Excel: this.fileName,
      biller_code: sessionStorage.getItem('biller_code'),
      typeOfupload: 'manual_eslip'
    };
    this.loading = true;
    this.billService.handleCsv(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.messageCode == '07') {
        this.uploading = false;
        this.msg.error('upload failed.');
      } else if (response.messageCode == '00') {
        this.toastr.success(response.message, 'Success');
        this.uploading = false;
        this.fileList = [];
        this.msg.success('upload successfully.');
        this.router
          .navigate(['app/dashboard/uploaded-file-summary'])
          .then(value => {
            this.myaccountsService.fetchAccountsSubject.next(true);
          });
        this.closeDialog();
      } else {
        this.toastr.success(response.message, 'Success');
        this.uploading = false;
        this.fileList = [];
        this.msg.success('upload successfully.');
        this.closeDialog();
      }
    });
  }
  downloadCSV() {
    this.excelDownload.accountsSampleExcel(' Accounts Sample', this.localData);
  }

  closeDialog() {
    this.modalService.closeAll();
  }



  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
}
