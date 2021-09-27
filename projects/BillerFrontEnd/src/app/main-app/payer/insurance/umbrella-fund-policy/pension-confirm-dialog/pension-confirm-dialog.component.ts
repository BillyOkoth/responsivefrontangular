import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pension-confirm-dialog',
  templateUrl: './pension-confirm-dialog.component.html',
  styleUrls: ['./pension-confirm-dialog.component.css']
})
export class PensionConfirmDialogComponent implements OnInit {
  
  testData;
  uploading: boolean;
  loading =  false;
  selected_file = [];
  constructor(
    private modalService: NzModalService,
    private toastr: ToastrService,
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selected_file = JSON.parse(sessionStorage.getItem('fileLength'));
    sessionStorage.getItem('excel64');
    sessionStorage.getItem('excelDate');
    sessionStorage.getItem('excelBillerCode');

    sessionStorage.getItem('fileLength');
    this.testData = sessionStorage.getItem('pensionExel');
  }

  handleCancel(){
    this.modalService.closeAll();
  }

  uploadInvoices() {
    this.uploading = true;
    this.loading = true;
     //session storage.
    const payload = {
      base64Excel :   sessionStorage.getItem('excel64'),
      date:  sessionStorage.getItem('excelDate'),
      biller_code: sessionStorage.getItem('biller_code')
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


}
