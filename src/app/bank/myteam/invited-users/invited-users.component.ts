import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { TeamsServiceService } from '../teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { RejectedCreatedUserComponent } from '../rejected-created-user/rejected-created-user.component';
import { ApproveBankUserModalComponent } from '../approve-bank-user-modal/approve-bank-user-modal.component';

@Component({
  selector: 'app-invited-users',
  templateUrl: './invited-users.component.html',
  styleUrls: ['./invited-users.component.scss'],
})
export class InvitedUsersComponent implements OnInit {
  loading: boolean;
  rows: any[];
  invitedusers: any[];
  cols: { field: string; header: string }[];
  listGroup: any;
  idSelectedGroup: any;
  selectedRow: any;
  roleLists: any;
  newRow: boolean;
  row: {};
  displayDialog: boolean;
  user: {};
  username: any;
  email: any;
  other_name: any;
  role: any;
  searchValue = '';
  disabled: boolean;
  constructor(
    private billerService: BillersService,
    private toastr: ToastrService,
    private teamService: TeamsServiceService,
    private modalService: NzModalService,
    private excelDownload: ExcelDataService,
    public roles: RolesService,
  ) {}

  ngOnInit() {

      this.teamService.fetchInvitedTeamSubject.subscribe(value => {
      if (!this.loading) {
        // prevent more than one request at a time ..
        this.getBankUsers();
      }



    });
    // this.getBankUsers();
    this.cols = [
      { field: 'otherName', header: 'First Name' },
      { field: 'username', header: 'Other Name' },
      { field: 'status', header: 'Status' },
      { field: 'userGroup', header: 'User Group' }
    ];
  }

  getBankUsers() {
    this.loading = true;
    const payload = {};

    this.billerService.getBankUsers(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = [];
        this.invitedusers = [];
        response.forEach((value: any) => {
          if (value.status === 'Invited') {
            this.invitedusers.push(value);

            this.rows = this.invitedusers;
          }
        });
      },
      (err: any) => {

      }
    );
  }


  handleCancel(): void {
    this.displayDialog = false;
  }
  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  onRowSelect(value) {

       this.idSelectedGroup = value.group_id;
    this.displayDialog = true;



    this.displayDialog = true;
    this.username = value.username;
    this.email = value.email;
    this.other_name = value.otherName;
    this.role = value.userGroup;

  }

  approveBankUser(value) {

    sessionStorage.setItem('ApproveCreatedUserName', value.username);

    this.modalService.create({
      nzTitle: 'Approve Bank User',
      nzContent: ApproveBankUserModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

    // this.loading = true
    // const payload = {
    //   username: value
    // };

    // this.teamService.approveBankUser(payload).subscribe((response: any) => {
    //   if (response.messageCode == '00') {
    //     this.loading = false;
    //     this.teamService.fetchInvitedTeamSubject.next(true);
    //     this.toastr.success(response.message,'Success');

    //     setTimeout(() => {
    //       this.displayDialog = false;
    //     }, 5000);
    //   } else if (response.messageCode == '07') {

    //     this.loading = false;
    //     this.toastr.warning(response.message,'Warning');
    //     setTimeout(() => {
    //       this.displayDialog = false;
    //     }, 5000);
    //   }
    // }),
    // (err:any)=>{
    // ;
    // };
  }


  downloadExcel() {
    this.loading =  true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelTeamMember('Users', rows);
    this.loading =  false;

  }


  rejectCreateUser(value) {
    sessionStorage.setItem('RejectedCreatedUserName', value.username);

    this.modalService.create({
      nzTitle: 'Reject Created User',
      nzContent: RejectedCreatedUserComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
    }

}

