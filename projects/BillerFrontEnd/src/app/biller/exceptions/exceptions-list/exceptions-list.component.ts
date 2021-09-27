import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller-service/biller.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PayEslipComponent } from '../pay-eslip/pay-eslip.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-exceptions-list',
  templateUrl: './exceptions-list.component.html',
  styleUrls: ['./exceptions-list.component.css']
})
export class ExceptionsListComponent implements OnInit {
  rows = [];
  cols = [];
  loading: boolean;
  searchValue = '';
  aa = false;

  constructor(
    private eslipService: BillerService,

    private router: Router,
    private toastr: ToastrService,
    private modalService: NzModalService

  ) { }

  ngOnInit() {

    this.eslipService.fetchExceptions.subscribe(value => {
      this.getExceptions();
    }
    );
    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'amount', header: 'Amount' },
      { field: 'reference', header: 'Reference' },
      { field: 'ft', header: 'FT' },
      { field: 'eslip_no', header: 'EslipNo' }
    ];
  }

  getExceptions() {
    this.loading = true;
    const pendingExceptions = [];
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe(
      (response: any) => {
      this.loading = false;
      response.forEach(
        (value: any) => {


        if (
          value.status.toLowerCase() === 'pending') {
          pendingExceptions.push(value);

        }
      });
      this.rows = pendingExceptions;
    });
  }

  reconciliationFn(value) {

    sessionStorage.setItem('datecreated', value.created_at);
    sessionStorage.setItem('valueamount', value.amount);
    sessionStorage.setItem('reference', value.reference);
    sessionStorage.setItem('ft', value.ft);
    sessionStorage.setItem('eslipNO', value.eslip_no);
    sessionStorage.setItem('ID', value.id);




    this.modalService.create({
      nzTitle: 'Reconciliation.',
      nzContent: PayEslipComponent,
      nzWidth: '40vw',
      nzFooter: null
    });




  }

  ignoreFn(value) {
    const payload = {
      id: value.id
    };
    this.eslipService.ignoreExceptionLogs(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode == '00') {

          this.toastr.success(response.message, 'Success');
          this.eslipService.fetchExceptions.next(true);
        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {}
      }, (err: any) => {
        this.loading = false;

      }
    );
  }

  setIndex(ii) {
    this.aa = ii;

  }




}
