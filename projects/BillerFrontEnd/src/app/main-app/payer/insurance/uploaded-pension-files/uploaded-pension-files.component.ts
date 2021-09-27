import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ViewPolicyFileModalComponent } from '../outstanding-policies/view-policy-file-modal/view-policy-file-modal.component';

@Component({
  selector: 'app-uploaded-pension-files',
  templateUrl: './uploaded-pension-files.component.html',
  styleUrls: ['./uploaded-pension-files.component.css']
})
export class UploadedPensionFilesComponent implements OnInit {
  length;
  rows = [];
  loading = false;
  outInvoice = [];
  searchValue = '';
  aa = false;
  insurance_code;
  isIndeterminate = false;
  selectedRows = [];
  selectedRow = [];
  slipTotal = 0;
  toPayTotal: any = 0;
  isAllDisplayDataChecked = false;
  billerCode;
  dueDate;

  constructor(

    private billerService: BillerService,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {

    this.insurance_code = sessionStorage.getItem('biller_code');

    this.getPolicies();
  }

  getPolicies() {

    const payload = {
      biller_code: this.insurance_code
    };

    this.rows = [];
    this.outInvoice = [];

    this.billerService.payerGetMyPolicies(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (value.status.toLowerCase() === 'pending' && value.policy_type.toLowerCase() === 'umbrella') {

            this.outInvoice.push(value);
          }
        });
        this.rows = this.outInvoice;
      }


    );
  }
  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.outstandingPolicies('Outstanding Policies', rows);
    this.loading = false;
  }

  setIndex(ii) {
    this.aa = ii;
  }

  viewPolicyFiles(data) {

    sessionStorage.setItem('policyFile', data.file_id);
    this.modalService.create({
      nzTitle: 'View Policy File',
      nzContent: ViewPolicyFileModalComponent,
      nzWidth: '80vw',
      nzFooter: null,
      nzMaskClosable: false
    });

  }




}
