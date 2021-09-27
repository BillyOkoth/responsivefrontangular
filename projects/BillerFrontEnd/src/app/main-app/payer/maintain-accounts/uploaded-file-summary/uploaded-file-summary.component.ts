import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { getMyUploadedFiles } from '../../../../service/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaded-file-summary',
  templateUrl: './uploaded-file-summary.component.html',
  styleUrls: ['./uploaded-file-summary.component.css']
})
export class UploadedFileSummaryComponent implements OnInit {
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
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public billerService: LoginService
  ) {}

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
    this.router.navigate(['/app/dashboard/view-my-accounts']);
  }

  /**
   * @description :: view uploaded file details
   */

  viewUploadedFileDetails(row: any) {
    this.billerService.file_id = row.file_id;
    this.billerService.file_name = row.file_name;
    this.billerService.validated = row.validated;

    this.router.navigate(['/app/uploaded-file-details']);
  }

  /// upload the queried accounts.
  uploadAccounts(): void {
    this.loading = true;

    const payload: getMyUploadedFiles = {
      biller_code: sessionStorage.getItem('biller_code')
    };

    this.billerService.fetchUploadFiles(payload).subscribe((response: any) => {
      this.rows = response;
      this.text = false;

      this.progress = response[0].progress;
      if (this.progress == 100) {
        this.loading = false;
      }
      this.value = response[0].progress;
    }),
      (err: any) => {

      };
  }

  viewUploadedPaymentDetails(row) {

  }

  ngOnDestroy() {
    clearInterval(this.refresh_id);
  }

  convertNumber(validated: string, errors: string): Number {
    return parseInt(validated) - parseInt(errors);
  }


  reValidate(data) {


   this.loading = true ;
   const payload = {
     file_id: data.file_id
   };

   this.billerService.reValidate(payload).subscribe(
     (response: any) => {

       this.loading = false ;

       if (response.messageCode === '00') {
         this.toastr.success(response.message, 'Success');
       } else if (response.messageCode === '02') {
        this.toastr.warning(response.message, 'Warning');
       } else if (response.messageCode === '06') {
        this.toastr.warning(response.message, 'Warning');
      } else {}



     }
   );


  }
}
