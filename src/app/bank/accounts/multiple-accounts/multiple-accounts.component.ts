import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { AccountService } from 'src/app/core/services/accounts/account.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFile, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-multiple-accounts',
  templateUrl: './multiple-accounts.component.html',
  styleUrls: ['./multiple-accounts.component.scss']
})
export class MultipleAccountsComponent implements OnInit {
  constructor(
    public boardingData: OnboardingService,
    private billerService: BillersService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private excelDownload: ExcelDataService,
    private modalService: NzModalService
  ) {}
  loading = false;
  rows = [];
  file_name;
  fileName: any;
  msgs = [];
  uploading = false;
  fileList: any = [];
  roleLists = <any>[];
  selected_file = [];
  billerLists = <any>[];
  payerLists = <any>[];

  uploadForm = new FormGroup({
    biller_id: new FormControl(''),
    payer_id: new FormControl('')
  });



  public localData = [
    {
      Accountno: '000100000',
      Accountname: 'Stanbic'
    }
  ];

  ngOnInit() {

    this.uploadForm = this.fb.group({
      biller_id: ['', Validators.required],
      payer_id: ['', Validators.required]
    });
  }

  // uploading of the excel file.

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

  // push the accounts to the server
  uploadAccounts() {
    this.uploading = true;
    const formData = this.uploadForm.value;
    this.file_name = this.fileList[0].name;
    const payload: any = {
      file_name: this.file_name,

      base64Excel: this.fileName,
      biller_code: sessionStorage.getItem('biller_code'),
      payer_code: sessionStorage.getItem('payer_code'),
      typeOfupload: 'manual_eslip'
    };
    this.loading = true;
    this.billerService
      .uploadExceBankAccounts(payload)
      .subscribe((response: any) => {
        this.loading = false;
        if (response.messageCode == '07') {
          this.toastr.success(response.message, 'Warning');
        } else if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');

          this.router.navigate(['admin/uploaded-file-summary']);
          this.closeDialog();
        } else {
          this.toastr.error(response.message, 'Warning');
        }
      }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xlsx') {
      return true;
    } else {
      return false;
    }
  }

  closeDialog() {
   this.modalService.closeAll();
  }

  downloadCSV() {
    this.excelDownload.accountsSampleExcel(' Accounts Sample', this.localData);
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
}
