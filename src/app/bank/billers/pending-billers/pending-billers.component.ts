import { Component, OnInit, ViewChild } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { RejectNewBillerComponent } from '../reject-new-biller/reject-new-biller.component';
import { ApproveBillerModalComponent } from '../approve-biller-modal/approve-biller-modal.component';
import { map } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-pending-billers',
  templateUrl: './pending-billers.component.html',
  styleUrls: ['./pending-billers.component.scss']
})
export class PendingBillersComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  number;
  cols = [];
  loading = true;
  CountInvited;
  pendingBillers = [];
  no_of_pending_billers;
  searchValue = '';
  aa = false;
  disabled: boolean;

  constructor(
    private billerService: BillersService,
    private toastr: ToastrService,
    private boardSteps: BoardingStepsService,
    private router: Router,
    public role: RolesService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.CountInvited = this.boardSteps.InvitedCount;

    this.cols = [
      { field: 'company_name', header: 'Company Name' },
      { field: 'comp_code', header: 'Biller Code' },
      { field: 'sector', header: 'Sector' },
      { field: 'branch', header: 'Branch' }
    ];
    this.billerService.pendingBillerSubject.subscribe(
      value => {
        this.getBankUsers();
      }
    );



    this.disabled = this.role.billerAllRoles;
  }

  getBankUsers() {
    const payload = {};

    this.loading = true;
    this.billerService.getAllUsersFromBankside(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (
            value.status.toLowerCase() === 'unapproved' &&
            value.user_type.toLowerCase() === 'biller'
          ) {
            this.pendingBillers.push(value);
            this.no_of_pending_billers = this.pendingBillers.length;
            this.rows = this.pendingBillers;
          }
        });
      },
      err => {
        this.toastr.error('There is no server connection!');
        this.loading = false;
      }
    );
  }

  viewMore(billercode): void {
    sessionStorage.setItem('biller_code', billercode.comp_code);
    this.router.navigate(['/admin/biller-profile']);
  }
  setIndex(ii) {
    this.aa = ii;
  }

  approveBiller(data) {
    sessionStorage.setItem('ApproveBillerCode', data.comp_code);
    sessionStorage.setItem('ApproveBillerName', data.company_name);

  const modal =   this.modalService.create({
      nzTitle: 'Approve New Biller',
      nzContent: ApproveBillerModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
    modal.afterClose.pipe(map(() => {})).subscribe(() => {
      this.getBankUsers();
    });
  }

  RejectNewBiller(data) {

    sessionStorage.setItem('rejectEmail', data.email);
    sessionStorage.setItem('rejectCode', data.comp_code);
    sessionStorage.setItem('rejectBillerName', data.company_name);
    this.modalService.create({
      nzTitle: 'Reject New Biller',
      nzContent: RejectNewBillerComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }
}
