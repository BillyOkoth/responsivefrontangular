import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { Router } from '@angular/router';
import { ConfirmEslipComponent } from '../payments/confirm-eslip/confirm-eslip.component';

import { ExcelDataService } from '../../../../service/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-upload-payment-file-dialog',
  templateUrl: './upload-payment-file-dialog.component.html',
  styleUrls: ['./upload-payment-file-dialog.component.css']
})
export class UploadPaymentFileDialogComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private excelDownload: ExcelDataService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}
  msgs = [];
  fileName: any;
  file_name;
  fileNo = 0;
  loading = false;
  correctFile = false;
  isVisible = false;
  fileList: any = [];
  isConfirmLoading = false;
  uploading = false;

  // download the sample file
  public localData = [
    {
      Accountno: '000100000'
    }
  ];

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit() {
    this.isVisible = true;
  }

  /**
   * @description:: close this modal
   */
  closeModal(): void {
    this.modalService.closeAll();
  }

  /**
   * @description:: save file accounts to profile of the user
   */
  saveBtn(): void {}

  fileChange(): void {
    this.file_name = this.fileList[0].name;
    const FileEvent = this.fileList[0];

    const reader = new FileReader();

    // this.fileNo = event.target.files.length;
    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');

      this.fileName = base64Arry[1];
    });
    reader.readAsDataURL(FileEvent);
  }

  uploadFileDialog() {
    this.modalService.create({
      nzTitle: 'Confirm Eslip Generation',
      nzContent: ConfirmEslipComponent,
      nzFooter: null,
      nzWidth: '50%'
    });
  }

  uploadFile() {
    this.loading = true;
    this.uploading = true;
    const payload = {
      file_name: this.file_name,
      base64Excel: this.fileName,
      biller_code: sessionStorage.getItem('biller_code'),
      typeOfupload: 'auto_eslip'
    };

    this.loginService.uploadFile(payload).subscribe((response: any) => {
      this.uploading = true;
      if (response.messageCode == '00') {
        this.toastr.success(response.message, 'Success');
        this.loading = false;
        this.loginService.path = response.path;
        this.loginService.accountsSelected = response.account_records[0].length;

        this.calculateOddCents(response.account_records[0]);
        this.closeModal();

        // setTimeout(() => {
        //   this.closeModal();
        // }, 10000);
        this.uploadFileDialog();
      } else if (response.messageCode == '08') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode == '07') {
        this.toastr.warning(response.message, 'Warning');
        this.loading = false;
        this.loginService.failedAccount = response.account_records;
        setTimeout(() => {
          this.closeModal();
        }, 1000);
        this.router.navigate(['app/dashboard/rejected-accounts']);
      } else {
        this.loading = false;
        setTimeout(() => {
          this.closeModal();
        }, 10000);
      }
    });
  }
  downloadCSV() {
    this.excelDownload.paymentsSampleExcel('payments sample', this.localData);
  }

  calculateOddCents(accounts: any) {
    this.loginService.oddCentsFound = false;
    this.loginService.oddCentAccount = '';
    this.loginService.oddCentAmount = 0;
    this.loginService.paymentFileAmount = 0;

    let total = 0;

    accounts.forEach(value => {
      total += Number(value.amount);
      total = parseFloat(total.toFixed(2));
    });

    const cents = total.toString();

    let decimalPoints = '0';
    let centAdded = 0;
    const centArray = cents.split('.');

    if (centArray.length > 1) {
      decimalPoints = centArray[1];

      let intString = decimalPoints.toString();
      let digitTwo = intString.charAt(1);
      const digitThree = intString.charAt(2) || '0';

      if (parseInt(digitThree) == 9) {
        decimalPoints += 1;

        intString = decimalPoints.toString();

        digitTwo = intString.charAt(1);
      }

      const DIGIT_TEST = parseInt(digitTwo);
      // console.log(DIGIT_TEST);
      if (DIGIT_TEST > 5) {
        centAdded = (10 - DIGIT_TEST) / 100;
        this.loginService.oddCentAmount = centAdded;
        this.loginService.oddCentsFound = true;

        this.loginService.oddCentAccount =
          accounts[accounts.length - 1].accountNo;
      } else if (DIGIT_TEST < 5 && DIGIT_TEST > 0) {
        centAdded = (5 - DIGIT_TEST) / 100;
        this.loginService.oddCentAmount = centAdded;
        this.loginService.oddCentsFound = true;

        this.loginService.oddCentAccount =
          accounts[accounts.length - 1].accountNo;
      }
    } // end calculation

    total = total + centAdded;
    this.loginService.paymentFileAmount = Math.floor(total * 100) / 100;
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
}
