import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillerService } from 'projects/BillerFrontEnd/src/app/biller/services/biller-service/biller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-payer-confirm-dialog',
  templateUrl: './multiple-payer-confirm-dialog.component.html',
  styleUrls: ['./multiple-payer-confirm-dialog.component.css']
})
export class MultiplePayerConfirmDialogComponent implements OnInit {
  testData;
  uploading: boolean;
  loading =  false;
  selected_file = [];
  selected_Date = '';
  uploadedFiles: any[] = [];
  file_id;
  path;
  file_name;
  fileName: any;
  fileList: any = [];
  roleLists = [];
  insurance_code;
  policy_outliers = [] ;

  constructor(

    private modalService: NzModalService,
    private toastr: ToastrService,
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    sessionStorage.getItem('multipleBillingId');
    sessionStorage.getItem('multiplePolicyType');
    this.testData = sessionStorage.getItem('multiplePayersName');
   this.selected_file = JSON.parse(sessionStorage.getItem('multipleSelectedFile')) ; 
  }

  handleCancel(){
    this.modalService.closeAll();
  }
  uploadPayers() {
    this.loading = true;
    this.uploading = true;   

    const payload = {
      base64Excel: sessionStorage.getItem('multipleExcel'),
      billing_id:   sessionStorage.getItem('multipleBillingId'),
      policy_type:  sessionStorage.getItem('multiplePolicyType')
    };

    this.billerService.uploadPayerFile(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.billerService.fetchInvitedSubject.next(true);
          this.modalService.closeAll();
          this.toastr.success(response.message, 'Success');
          break;
        case '01':
          this.toastr.warning(response.message, 'Warning');
          break;

        case '02':
          this.toastr.warning(response.message, 'Warning');
          break;

        case '03':
          this.toastr.warning(response.message, 'Warning');
          break;

        default:
          this.toastr.warning(response.message, 'Warning');
          break;
      }
    });
  }


}
