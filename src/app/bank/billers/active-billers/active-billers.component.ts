import { Component, OnInit, ViewChild } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';

import { Observable } from 'rxjs';
import { Billers, Token } from 'src/app/core/services/billers/billers.model';
import { DataSource } from '@angular/cdk/table';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditBillerComponent } from '../edit-biller/edit-biller.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ConfirmDeleteBillerComponent } from '../confirm-delete-biller/confirm-delete-biller.component';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { BillerTeamService } from 'src/app/core/services/billers/biller-team/biller-team.service';
import { BillerTeamMembersComponent } from './biller-team-members/biller-team-members.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-active-billers',
  templateUrl: './active-billers.component.html',
  styleUrls: ['./active-billers.component.scss']
})
export class ActiveBillersComponent implements OnInit {
  editing = {};
  rows = [];
  cols = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  number;

  CountActive;
  loading = false;
  ActiveBillers = [];

  no_of_active_billers;
  searchValue = '';
  aa = false;
  newRow: boolean;
  displayDialog: boolean;
  row: {};
  disabled: boolean;

  constructor(
    private billerService: BillersService,
    private boardSteps: BoardingStepsService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NzModalService,
    public role: RolesService,
    private excelDownload: ExcelDataService,
    private billerTeam: BillerTeamService
  ) {}

  ngOnInit() {
    this.CountActive = this.boardSteps.activeCount;
    this.billerService.updateBillerSubject.subscribe(value => {
      this.getBankUsers();
    });

    this.cols = [
      { field: 'company_name', header: 'Company Name' },
      { field: 'comp_code', header: 'Biller Code' },
      { field: 'sector', header: 'Sector' },
      { field: 'branch', header: 'Branch' }
    ];
    this.disabled = this.role.billerAllRoles;
  }

  // view more about the billers

  viewMore(billercode): void {
    sessionStorage.setItem('biller_code', billercode.comp_code);
    this.router.navigate(['/admin/biller-profile']);
  }

  getBankUsers() {
    const payload = {};
    this.rows = [];
    this.ActiveBillers = [];
    this.loading = true;
    this.billerService.getAllUsersFromBankside(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (
            value.status === 'Active' &&
            value.user_type.toLowerCase() === 'biller'
          ) {
            this.ActiveBillers.push(value);
            this.rows = this.ActiveBillers;

            this.no_of_active_billers = this.ActiveBillers.length;
          }
        });
      },
      err => {
        this.toastr.error('There is no server connection!');
        this.loading = false;
      }
    );
  }

  editBiller(value) {
    const payload = {
      email: value.email,
      comp_code: value.comp_code
    };

    this.billerService.getBiller(payload).subscribe((response: any) => {
      sessionStorage.setItem('biller_details', JSON.stringify(response));

      this.modalService.create({
        nzTitle: 'Edit Biller',
        nzContent: EditBillerComponent,
        nzWidth: '70vw',
        nzFooter: null
      });
    });
  }
  onRowSelect() {}
  setIndex(ii) {
    this.aa = ii;
  }

  addEbiller() {
    this.router.navigate(['/admin/add-biller']);
  }

  addClosedBiller() {
    this.router.navigate(['/admin/add-closed-biller']);
  }

  DeleteBiller(data) {
    sessionStorage.setItem('deleteEmail', data.email);
    sessionStorage.setItem('deleteCode', data.comp_code);
    sessionStorage.setItem('deleteBillerName', data.company_name);

    this.modalService.create({
      nzTitle: 'Delete Biller',
      nzContent: ConfirmDeleteBillerComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.buildExcelBillers('Billers', rows);
    this.loading = false;
  }

  getTeamMembers(value) {
    sessionStorage.setItem('comp_code', value.comp_code);
   const billerTeam = this.modalService.create({
      nzTitle: 'Biller Team',
      nzContent: BillerTeamMembersComponent,
      nzWidth: '70%'
    });

    // this.router.navigate(["admin/biller-team"]);
  }
}
