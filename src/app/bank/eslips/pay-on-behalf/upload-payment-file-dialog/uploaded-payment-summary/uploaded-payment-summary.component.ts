import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';

import { BillersService } from 'src/app/core/services/billers/billers.service';
import {
  FileExcel,
  GetGroup,
  EslipBank
} from 'src/app/core/services/billers/billers.model';

@Component({
  selector: 'app-uploaded-payment-summary',
  templateUrl: './uploaded-payment-summary.component.html',
  styleUrls: ['./uploaded-payment-summary.component.css']
})
export class UploadedPaymentSummaryComponent implements OnInit, OnDestroy {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;

  loading = false;
  text = false;
  disptab = false;

  refresh_id;
  biller_code;
  created_at;
  file_id;
  file_name;
  payer_code;
  pending;
  total;
  validated;
  progress;
  showButton = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private payerService: BillersService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getUploadedFileBank();
    this.text = true;
    this.disptab = false;

    this.refresh_id = setInterval(() => {
      this.getUploadedFileBank();
    }, 10000);
  }

  viewUploadedPaymentDetails(value) {
    this.payerService.selectedFileId = value.file_id;
    this.payerService.selectedFileName = value.file_name;
    this.router.navigate(['admin/uploaded-payment-details']);
  }

  uploadFileSummary() {
    this.loading = true;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };

    this.loginService
      .uploadPaymentsSummary(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.disptab = true;
        this.text = false;

        this.rows = response;

        this.progress = response[0].progress;
        if (this.progress == '100%') {
          this.text = false;
          this.loading = false;
          this.showButton = true;
          clearInterval(this.refresh_id);
        } else {
          this.showButton = false;
          this.loading = true;
        }
      });
  }

  generateEslip(value) {
    const payload: EslipBank = {
      file_id: value.file_id,

      payer_code: this.payerService.selectedPayerCode,
      biller_code: this.payerService.selectedBillerCode
    };

    this.payerService.generateEslipBank(payload).subscribe((response: any) => {
      if (response.messageCode === '00') {
        // eslip_no

        this.payerService.selectedEslipNo = response.eslip_no;


      }
    });
  }

  // get the progress of validated accounts

  getUploadedFileBank(): void {
    const payload: GetGroup = {};

    this.payerService
      .getUploadedFileBank(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.disptab = true;
        this.text = false;

        this.rows = response;

        this.progress = response[0].progress;
        if (this.progress === '100%') {
          this.text = false;
          this.loading = false;
          this.showButton = true;
          clearInterval(this.refresh_id);
        } else {
          this.showButton = false;
          this.loading = false;
        }
      });
  }

  /// get the files that are uploaded.

  getUploadedFilesRecords() {
    const payload: FileExcel = {
      file_id: this.payerService.selectedFileId
    };

    this.payerService
      .getUploadedFilesRecords(payload)
      .subscribe(response => {});
  }

  ngOnDestroy() {
    clearInterval(this.refresh_id);
  }
}
