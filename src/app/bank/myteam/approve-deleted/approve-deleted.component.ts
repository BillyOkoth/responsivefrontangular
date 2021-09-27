import { Component, OnInit } from '@angular/core';
import { GetGroup } from 'src/app/core/services/billers/billers.model';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RejectedDeletedUserComponent } from '../rejected-deleted-user/rejected-deleted-user.component';
import { TeamsServiceService } from '../teams-service.service';
import { ApproveDeletedBankUserModalComponent } from '../approve-deleted-bank-user-modal/approve-deleted-bank-user-modal.component';

@Component({
  selector: 'app-approve-deleted',
  templateUrl: './approve-deleted.component.html',
  styleUrls: ['./approve-deleted.component.scss']
})
export class ApproveDeletedComponent implements OnInit {
  loading: boolean;
  rows = [];
  tobedeleted = [];
  searchValue = '';

  constructor(
    private loginService: BillersService,
    public role: RolesService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private teamService: TeamsServiceService
  ) { }

  ngOnInit() {

    this.teamService.fetchDeletedUserSubject.subscribe(
      value => {
        this.getBankUsers();

      }
    );

  }

  getBankUsers() {
    this.loading = true;
    const payload: GetGroup = {};

    this.loginService.getBankUsers(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = [];
        this.tobedeleted = [];
        // this.rows = response
        response.forEach((value: any) => {

          if (value.delete_user === 'yes') {
            this.tobedeleted.push(value);

            // this.no_of_active_users = this.activeusers.length;

            this.rows = this.tobedeleted;
          }
        });
      },
      (err: any) => {}
    );
  }


  deleteUser(data) {


    sessionStorage.setItem('ApproveDeleteBankUser', data.username);

    this.modalService.create({
      nzTitle: 'Approve Delete Bank User',
      nzContent: ApproveDeletedBankUserModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });


    // this.loading = true
    // const payload = {
    //   username: value
    // }
    // this.role.approveDeletedUser(payload).subscribe((response: any) => {
    //   this.loading = false
    //   switch (response.messageCode) {
    //     case "02":
    //       this.toastr.warning(response.message)
    //       break;
    //       case "06":
    //         this.toastr.warning(response.message)
    //         break;
    //     default:
    //       this.toastr.success(response.message)
    //       this.getBankUsers()
    //       break;
    //   }
    // },
    // (err: any) => {
    //   this.loading = false

    // } )
  }

  rejectDeleteUser(data) {

    sessionStorage.setItem('RejectedDeleteUserName', data.username);

    this.modalService.create({
      nzTitle: 'Reject Edit User',
      nzContent: RejectedDeletedUserComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

  }
}
