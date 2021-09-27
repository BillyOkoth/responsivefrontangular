import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaded-payment-summary',
  templateUrl: './uploaded-payment-summary.component.html',
  styleUrls: ['./uploaded-payment-summary.component.css']
})
export class UploadedPaymentSummaryComponent implements OnInit, OnDestroy {
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
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

  constructor(private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService) {}

  ngOnInit() {
    this.loading = true;
    this.text = true;
    this.disptab = false;
    this.uploadFileSummary();
    this.refresh_id = setInterval(() => {
      this.uploadFileSummary();
    }, 10000);
  }

  /**
   * @description:: maintain accounts data
   */

  /**
   * @description :: view uploaded file details
   */
  viewUploadedPaymentDetails(value) {
    this.loginService.fileId = value.file_id;
    this.loginService.fileName = value.file_name;
    this.router.navigate(['/app/uploaded-payment-details']);
  }

  uploadFileSummary() {
    this.loading = true;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };

    this.loginService
      .uploadPaymentsSummary(payload)
      .subscribe((response: any) => {
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
          this.loading = false;
        }
      }, (err: any) => {

      });
  }

  generateEslip(value) {
    const payload = {
      file_id: value.file_id,
      biller_code: value.biller_code
    };

    this.loginService.generatePaymentEslip(payload).subscribe(response => {

    }, (err: any) => {

    });
  }

  ngOnDestroy() {
    clearInterval(this.refresh_id);
  }
}
