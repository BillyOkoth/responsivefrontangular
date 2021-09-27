import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { Router } from '@angular/router';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ModalIgonreExceptionsComponent } from '../modal-igonre-exceptions/modal-igonre-exceptions.component';

@Component({
  selector: 'app-ignored-exceptions',
  templateUrl: './ignored-exceptions.component.html',
  styleUrls: ['./ignored-exceptions.component.scss']
})
export class IgnoredExceptionsComponent implements OnInit {

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
  ) { }

  ngOnInit() {

    this.eslipService.fetchRestoreExceptions.subscribe(value => {
      this.getExceptions();
    });
  }

  getExceptions() {
    this.loading = true;
    const ignoredExceptions = [];
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach(value => {
        if (value.status.toLowerCase() == 'ignored') {
          ignoredExceptions.push(value);
        }
      });
      this.rows = ignoredExceptions;


    });
  }

  restorePayments(data) {

    sessionStorage.setItem('restoredId', data.id);
    sessionStorage.setItem('restoredEslip', data.eslip_no);
    sessionStorage.setItem('restoredCreatedAt', data.created_at);
    sessionStorage.setItem('restoredAmount', data.amount);
    sessionStorage.setItem('restoredReference', data.reference);
    sessionStorage.setItem('restoredFt', data.ft);


    this.modalService.create({
      nzTitle: 'Restore Exceptions.',
      nzContent: ModalIgonreExceptionsComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

  }



}
