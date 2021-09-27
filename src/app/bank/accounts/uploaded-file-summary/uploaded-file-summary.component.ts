import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { LoginService } from "../../../service/login.service";
// import { getMyUploadedFiles } from "../../../service/login.model";

import { BillersService } from 'src/app/core/services/billers/billers.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaded-file-summary',
  templateUrl: './uploaded-file-summary.component.html',
  styleUrls: ['./uploaded-file-summary.component.scss']
})
export class UploadedFileSummaryComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;

  loading = false;
  text = false;
  dispTab = false;

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
  fileRows = [];
  value = 0;
  constructor(private router: Router,
    public billerService: BillersService,
    private toastr: ToastrService,
     private accountService: AccountService) {}

  ngOnInit() {
    this.loading = true;
    this.text = true;
    this.dispTab = false;

    this.billerService.progress = this.progress;
    this.billerService.validated = this.validated;
    this.billerService.total = this.total;
    this.billerService.created_at = this.created_at;
    this.billerService.file_id = this.file_id;
    this.billerService.file_name = this.file_name;
    this.billerService.pending = this.pending;

    this.uploadAccounts();

    this.refresh_id = setInterval(() => {
      this.uploadAccounts();
    }, 10000);
  }

  /**
   * @description:: maintain accounts data
   */
  maintain() {
    this.router.navigate(['/admin/viewAccounts']);
  }

  /**
   * @description :: view uploaded file details
   */

  viewUploadedFileDetails(row: any) {
    this.billerService.file_id = row.file_id;
    this.billerService.file_name = row.file_name;
    this.billerService.validated = row.validated;

    this.router.navigate(['/admin/uploaded-file-details']);
  }

  /// upload the queried accounts.
  uploadAccounts(): void {
    this.loading = true;

    const payload: any = {};

    this.accountService.fetchUploadedFiles(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
      this.text = false;

      this.progress = response[0].progress;
      this.value = response[0].progress;
      }, (err: any) => {
        this.toastr.error('There is no server connection!');
      });
  }

  viewUploadedPaymentDetails(row) {

  }

  ngOnDestroy() {
    clearInterval(this.refresh_id);
  }

  convertNumber(validated: string, errors: string): Number {
    return parseInt(validated) - parseInt(errors);
  }
}
