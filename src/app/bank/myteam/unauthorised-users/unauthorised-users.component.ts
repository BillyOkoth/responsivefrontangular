import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisteruserComponent } from '../registeruser/registeruser.component';
import { getGroup } from 'projects/BillerFrontEnd/src/app/service/login.model';

import { TeamsServiceService } from '../teams-service.service';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { UpdateTeamComponent } from '../update-team/update-team.component';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-unauthorised-users',
  templateUrl: './unauthorised-users.component.html',
  styleUrls: ['./unauthorised-users.component.scss']
})
export class UnauthorisedUsersComponent implements OnInit {
  cols = [];
  rows = [];
  aa = false;
  searchValue = '';

  restore: boolean;

  selectedgroupId;
  selectedGroup: any;
  displayDialog: boolean;
  row = {};
  newRow: boolean;
  msgs = [];
  loading = false;

  inactiveusers = [];
  onRestore = false;
  no_of_inactive_users;

  constructor(
    private router: Router,

    private loginService: BillersService,
    private teamService: TeamsServiceService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private excelDownload: ExcelDataService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.teamService.fetchInActiveTeamsSubject.subscribe(value => {
      if (!this.loading) {
        // prevent more than one request at a time ..
        this.getBankUsers();
      } else if ((this.onRestore = true)) {
        this.getBankUsers();
        this.ngOnInit();
      }
    });

    this.cols = [
      { field: 'username', header: 'User Name' },
      { field: 'otherName', header: 'Other Name' },
      { field: 'status', header: 'Status' },
      { field: 'userGroup', header: 'User Group' }
    ];
  }

  createUserGroup(): void {
    this.router.navigate(['/admin/user-groups']);
  }
  // prime ng refactors
  showDialogToAdd() {
    this.msgs = [];
    this.newRow = true;
    this.row = {};
    this.displayDialog = true;
  }

  onActivate() { }
  onSelect() { }


  onRowSelect(value) {

    sessionStorage.setItem('emailSet', value.email);
    sessionStorage.setItem('fnameSet', value.username);
    sessionStorage.setItem('lanameSet', value.otherName);
    sessionStorage.setItem('groupSet', value.group_id);
    sessionStorage.setItem('idSet', value.id);
    sessionStorage.setItem('status', value.status);

    this.modalService.create({
      nzTitle: 'Team Details',
      nzContent: UpdateTeamComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }



  getBankUsers() {
    this.loading = true;
    const payload: getGroup = {};

    this.rows = [];
    this.inactiveusers = [];
    this.loginService.getBankUsers(payload).subscribe(
      (response: any) => {
        this.loading = false;

        response.forEach((value: any) => {
          if (value.status === 'Inactive') {
            this.inactiveusers.push(value);

            this.no_of_inactive_users = this.inactiveusers.length;
          }
        });
        this.rows = this.inactiveusers;
      },
      (err: any) => {

      }
    );
  }

  updateUser(value) {
    this.msgs = [];

    this.loading = true;
    if (this.selectedGroup) {
      const payload: any = {
        username: value.username,
        other_names: value.otherName,
        group_id: this.selectedGroup.group_id,
        email: value.email,
        id: value.id
      };

      this.loginService.editBankUsers(payload).subscribe((response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.getBankUsers();

          this.toastr.success(response.message, 'Success');


        } else if (response.messageCode === '01') {

          this.toastr.warning(response.message, 'Warning');



        } else if (response.messageCode === '02') {

          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '03') {

          this.toastr.warning(response.message, 'Warning');


        } else if (response.messageCode === '04') {

          this.toastr.warning(response.message, 'Warning');


        } else if (response.messageCode === '05') {

          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '06') {

          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '07') {

          this.toastr.warning(response.message, 'Warning');


        } else if (response.messageCode === '08') {

          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      });

    } else if (value.group_id) {
      const payload: any = {
        username: value.username,
        other_names: value.otherName,
        group_id: value.group_id,
        email: value.email,
        id: value.id
      };



      this.loginService.editBankUsers(payload).subscribe((response: any) => {
        if (response.messageCode === '00') {
          this.getBankUsers();
          this.toastr.success(response.message, 'Success');


        } else if (response.messageCode === '01') {

          this.toastr.warning(response.message, 'Warning');


        } else if (response.messageCode === '02') {

          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '03') {

          this.toastr.warning(response.message, 'Warning');


        } else if (response.messageCode === '04') {

          this.toastr.warning(response.message, 'Warning');


        } else if (response.messageCode === '05') {

          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '06') {

          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '07') {
          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode === '08') {
          this.toastr.warning(response.message, 'Warning');

        } else {
        }
      });
    }
  }

  restoreUser(value) {
    this.msgs = [];
    this.loading = true;
    const payload = {
      username: value.username
    };

    this.teamService.restoreUser(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.messageCode === '00') {
        this.onRestore = true;
        this.getBankUsers();

        this.teamService.fetchActiveTeamSubject.next(true);
        this.toastr.success(response.message, 'Success');





      } else if (response.messageCode === '01') {

        this.toastr.warning(response.message, 'Warning');


      } else if (response.messageCode === '02') {

        this.toastr.warning(response.message, 'Warning');


      } else if (response.messageCode === '03') {

        this.toastr.warning(response.message, 'Warning');


      } else if (response.messageCode === '04') {

        this.toastr.warning(response.message, 'Warning');

      } else if (response.messageCode === '05') {

        this.toastr.warning(response.message, 'Warning');

      } else if (response.messageCode === '06') {

        this.toastr.warning(response.message, 'Warning');


      } else if (response.messageCode === '07') {
        this.toastr.warning(response.message, 'Warning');

      } else if (response.messageCode === '08') {
        this.toastr.warning(response.message, 'Warning');
      } else {
      }
    });
  }
  setIndex(ii) {
    this.aa = ii;
  }

  downloadExcel() {

    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelTeamMember('Users', rows);
    this.loading = false;


  }
}
