import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';

import { Router } from '@angular/router';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { PayEslipComponent } from 'src/app/bank/eslips/pay-on-behalf/pay-eslip/pay-eslip.component';
import { RolesService } from 'src/app/core/services/roles/roles';
import { IgnoreExceptionsModalComponent } from '../ignore-exceptions-modal/ignore-exceptions-modal.component';

@Component({
  selector: 'app-exceptions-list',
  templateUrl: './exceptions-list.component.html',
  styleUrls: ['./exceptions-list.component.scss']
})
export class ExceptionsListComponent implements OnInit {
  rows = [];
  cols = [];
  loading: boolean;
  searchValue = '';

  constructor(
    private eslipService: EslipsService,

    private router: Router,
    private excelData: ExcelDataService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    public role: RolesService
  ) {}

  ngOnInit() {
    this.eslipService.fetchExceptions.subscribe(value => {
      this.getExceptions();
    });

    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'amount', header: 'Amount' },
      { field: 'reference', header: 'Reference' },
      { field: 'ft', header: 'FT' },
      { field: 'eslip_no', header: 'EslipNo' }
    ];
  }

  viewDetails(value) {
    sessionStorage.setItem('payer', value.payer_name);
    sessionStorage.setItem('comp_code', value.comp_code);
    this.router.navigate(['admin/exception-details']);
  }
  downloadCSV() {
    const rows = [...this.rows];
    this.excelData.buildexceptionOwners('Exception Owners', rows);
  }

  reconciliationFn(value) {
    sessionStorage.setItem('datecreated', value.created_at);
    sessionStorage.setItem('valueamount', value.amount);
    sessionStorage.setItem('reference', value.reference);
    sessionStorage.setItem('ft', value.ft);
    sessionStorage.setItem('eslipNO', value.eslip_no);
    sessionStorage.setItem('ID', value.id);
    this.modalService.create(
      {
        nzTitle: 'Recon For:',
        nzContent: PayEslipComponent,
        nzFooter: null
      }
    );

  }

  ignoreFn(value) {
    sessionStorage.setItem('ignoredvalueamount', value.amount);
    sessionStorage.setItem('eslipnumber', value.eslip_no);
    sessionStorage.setItem('ExceptionsId', value.id);
    this.modalService.create({
      nzTitle: 'Ignore Exceptions.',
      nzContent: IgnoreExceptionsModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

    // const payload = {
    //   id: value.id
    // };
    // this.eslipService.ignoreExceptionLogs(payload).subscribe(
    //   (response: any) => {
    //     this.loading = false;
    //     if (response.messageCode == "00") {
    //       this.toastr.success(response.message, "Success");
    //       this.eslipService.fetchExceptions.next(true);
    //     } else if (response.messageCode == "02") {
    //       this.toastr.warning(response.message, "Warning");
    //     } else if (response.messageCode == "06") {
    //       this.toastr.warning(response.message, "Warning");
    //     } else {
    //     }
    //   },
    //   (err: any) => {
    //     this.toastr.error("There is no server Connection!");
    //   }
    // );
  }

  getExceptions() {
    this.loading = true;
    const pendingExceptions = [];
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe((response: any) => {
      this.loading = false;

      this.rows = response;
    });
  }
}
