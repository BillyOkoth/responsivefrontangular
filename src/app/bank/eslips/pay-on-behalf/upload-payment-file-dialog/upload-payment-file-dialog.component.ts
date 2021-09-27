import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { BillersService } from 'src/app/core/services/billers/billers.service';
import { UploadExcel, GetGroup } from 'src/app/core/services/billers/billers.model';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmEslipComponent } from '../confirm-eslip/confirm-eslip.component';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';

@Component({
  selector: 'app-upload-payment-file-dialog',
  templateUrl: './upload-payment-file-dialog.component.html',
  styleUrls: ['./upload-payment-file-dialog.component.css']
})
export class UploadPaymentFileDialogComponent implements OnInit {
  constructor(
    public loginService: BillersService,
    private router: Router,
    private toastr: ToastrService,
    private eslipService: EslipsService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private excelDownload: ExcelDataService
  ) {}
  fileName: string;
  file_name;
  fileNo = 0;
  uploadForm: FormGroup;
  billerLists = [];
  payerLists = [];
  loading: boolean;
  fileList: any = [];
  uploading: boolean;

  public localData = [
    {
      Accountno: '000100000'
    }
  ];

  ngOnInit() {
    this.fetchUsers();
    this.uploadForm = this.fb.group({
      biller: ['', [Validators.required]],
      payer: ['', [Validators.required]]
    });
  }

  /**
   * @description:: close this modal
   */
  closeModal(): void {
    // when u close  -- update accounts

    this.modalService.closeAll();
  }
  saveBtn(): void {}

  fileChange(): void {
    this.file_name = this.fileList[0].name;
    const FileEvent = this.fileList[0];

    const reader = new FileReader();
    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');

      this.loginService.selectedFileName = base64Arry[1];
      this.fileName = base64Arry[1];
    });
    reader.readAsDataURL(FileEvent);
  }

  uploadFile() {
    this.uploading = true;
    const payload: UploadExcel = {
      file_name: this.file_name,
      payer_code: sessionStorage.getItem('payer_code'),
      biller_code: sessionStorage.getItem('biller_code'),
      base64Excel: this.fileName,
      typeOfupload: 'auto_eslip'
    };


    this.eslipService.uploadFile(payload).subscribe((response: any) => {
      switch (response.messageCode) {
        case '00':
          this.closeModal();
          this.toastr.success(response.message, 'Success');
          this.accountService.path = response.path;
          this.accountService.accountsSelected =
            response.account_records[0].length;
          this.calculateOddCents(response.account_records[0]);
          this.uploadFileDialog();
          break;
        case '07':
          this.loading = false;
          this.accountService.failedAccount = response.account_records;
          setTimeout(() => {
            this.closeModal();
          }, 1000);
          this.router.navigate(['admin/rejected-accounts']);
          break;
        case '07':
          this.loading = false;
          this.toastr.warning(response.message, 'Warning');
          this.accountService.failedAccount = response.account_records;
          setTimeout(() => {
            this.closeModal();
          }, 1000);
          this.router.navigate(['admin/rejected-accounts']);
          break;
        case '08':
          this.loading = false;
          this.toastr.warning(response.message, 'Warning');
          break;
        default:
          this.toastr.error(response.message, 'Error');
          this.closeModal();
          break;
      }
    });
  }

  uploadFileDialog() {
    this.modalService.create({
      nzTitle: 'Confirm Eslip.',
      nzContent: ConfirmEslipComponent,
      nzFooter: null,
      nzWidth: '50vw'
    });
  }

  calculateOddCents(accounts: any) {
    this.accountService.oddCentsFound = false;
    this.accountService.oddCentAccount = '';
    this.accountService.oddCentAmount = 0;
    this.accountService.paymentFileAmount = 0;

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

      if (DIGIT_TEST > 5) {
        centAdded = (10 - DIGIT_TEST) / 100;
        this.accountService.oddCentAmount = centAdded;
        this.accountService.oddCentsFound = true;

        this.accountService.oddCentAccount =
          accounts[accounts.length - 1].accountNo;
      } else if (DIGIT_TEST < 5 && DIGIT_TEST > 0) {
        centAdded = (5 - DIGIT_TEST) / 100;
        this.accountService.oddCentAmount = centAdded;
        this.accountService.oddCentsFound = true;

        this.accountService.oddCentAccount =
          accounts[accounts.length - 1].accountNo;
      }
    } // end calculation

    total = total + centAdded;
    this.accountService.paymentFileAmount = total;
  }

  fetchUsers() {
    const payer = [];
    const biller = [];
    const payload = {};
    this.accountService.fetchAllUsers(payload).subscribe((response: any) => {
      response.forEach(value => {
        if (value.biller_type == 'payer') {
          payer.push(value);
          this.payerLists = payer;
        } else {
          biller.push(value);
          this.billerLists = biller;
        }
      });
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
  downloadCSV() {
    this.excelDownload.paymentsSampleExcel('payments sample', this.localData);
  }
}
