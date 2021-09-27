import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RejectedEditedUserComponent } from '../rejected-edited-user/rejected-edited-user.component';
import { TeamsServiceService } from '../teams-service.service';
import { ApproveEditedBankUserModalComponent } from '../approve-edited-bank-user-modal/approve-edited-bank-user-modal.component';

@Component({
  selector: 'app-approve-edited',
  templateUrl: './approve-edited.component.html',
  styleUrls: ['./approve-edited.component.scss']
})
export class ApproveEditedComponent implements OnInit {
  loading;
  searchValue = '';
  rows = [];
  tobeedited = [];

  constructor(
    private loginService: BillersService,
    public role: RolesService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private teamService: TeamsServiceService
  ) {}

  ngOnInit() {
    this.teamService.fetchEditedUserSubject.subscribe(value => {
      this.getBankUsers();
    });
  }

  getBankUsers() {
    this.loading = true;
    const payload: {} = {};

    this.loginService.getBankUsers(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = [];
        this.tobeedited = [];
        response.forEach((value: any) => {
          if (value.edit_user == 'yes') {
            this.tobeedited.push(value);

            this.rows = this.tobeedited;
          }
        });
      },

    );
  }

  editUser(data) {
    sessionStorage.setItem('editedDetails', JSON.stringify(data));

    sessionStorage.setItem('ApproveEditedBankUser', data.username);
    sessionStorage.setItem('ApproveEditedBankUserOtherName', data.otherName);
    sessionStorage.setItem('ApproveEditedBankUserGroup', data.userGroup);
    sessionStorage.setItem('ApproveEditedBankUserPhone', data.phone);
    sessionStorage.setItem('ApproveEditedBankUserNotif', data.notification);

    sessionStorage.setItem('ApproveEditedBankId', data.id);
    sessionStorage.setItem('ApproveEditedBankEmail', data.email);

    this.modalService.create({
      nzTitle: 'Approve Edit Bank User',
      nzContent: ApproveEditedBankUserModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });


  }

  rejectEditedUser(data) {
    sessionStorage.setItem('RejectedUserName', data.username);

    this.modalService.create({
      nzTitle: 'Reject Edit User',
      nzContent: RejectedEditedUserComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }
}
