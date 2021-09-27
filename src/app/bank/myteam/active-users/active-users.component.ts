import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisteruserComponent } from '../registeruser/registeruser.component';
import { getGroup } from 'projects/BillerFrontEnd/src/app/service/login.model';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { TeamsServiceService } from '../teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { UpdateTeamComponent } from '../update-team/update-team.component';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ConfirmTeamComponent } from '../confirm-team/confirm-team.component';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {
  cols = [];
  rows = [];

  selectedgroupId;
  selectedGroup: any;
  selectedRow: any;
  displayDialog: boolean;
  row = {};
  newRow: boolean;
  msgs = [];
  loading = false;
  onfreeze = false;
  idSelectedGroup: any;
  userGroup: any;
  searchValue = '';
  aa = false;

  activeusers = [];
  listGroup = [];
  no_of_active_users;

  constructor(
    private router: Router,
    private loginService: BillersService,
    private toastr: ToastrService,
    private teamService: TeamsServiceService,
    private modalService: NzModalService,
    private excelDownload: ExcelDataService,
    public role: RolesService
  ) {}

  ngOnInit() {

    this.teamService.fetchActiveTeamSubject.subscribe(value => {
      if (!this.loading) {
        this.getBankUsers();
      } else if ((this.onfreeze = true)) {
        this.getBankUsers();
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

  onActivate() {}
  onSelect() {}
  onRowSelect(value) {
    sessionStorage.setItem('val', JSON.stringify(value));
    sessionStorage.setItem('emailSet', value.email);
    sessionStorage.setItem('fnameSet', value.username);
    sessionStorage.setItem('lanameSet', value.otherName);
    sessionStorage.setItem('groupSet', value.group_id);
    sessionStorage.setItem('idSet', value.id);
    sessionStorage.setItem('status', value.status);
    sessionStorage.setItem('groupName', value.userGroup);
    sessionStorage.setItem('notification', value.notification);

    this.modalService.create({
      nzTitle: 'Team Details',
      nzContent: UpdateTeamComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  createNew(): void {
    this.modalService.create({
      nzTitle: 'Create Team Member',
      nzContent: RegisteruserComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

  getMyGroup() {
    const payload: getGroup = {};
    this.loading = true;
    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        this.loading = false;
      },
      (err: any) => {
        this.toastr.error('There is no server connection!');
      }
    );
  }

  getBankUsers() {
    this.loading = true;
    const payload: getGroup = {};

    this.loginService.getBankUsers(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = [];
        this.activeusers = [];
        response.forEach((value: any) => {
          if (value.status === 'Active') {
            this.activeusers.push(value);

            this.no_of_active_users = this.activeusers.length;

            this.rows = this.activeusers;
          }
        });
      },
      (err: any) => {}
    );
  }



  setIndex(ii) {
    this.aa = ii;
  }

  deleteTeamMember(value) {
    sessionStorage.setItem('USERNAME', value);

    this.modalService.create({
      nzTitle: 'Delete Team Member',
      nzContent: ConfirmTeamComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

    // this.loading = true;
    // const payload = {
    //   username: value
    // };
    // this.teamService.deleteBankUser(payload).subscribe((response: any) => {
    //   this.loading = false;
    //   switch (response.messageCode) {
    //     case "02":
    //       this.toastr.warning(response.message);
    //       break;
    //     case "06":
    //       this.toastr.warning(response.message);
    //       break;
    //     case "07":
    //       this.toastr.warning(response.message);
    //       break;
    //     default:
    //       this.toastr.success(response.message);
    //       this.getBankUsers();
    //       break;
    //   }
    // });
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelTeamMember('Users', rows);
    this.loading = false;
  }
}
