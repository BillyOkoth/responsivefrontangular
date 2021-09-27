import { Component, OnInit } from '@angular/core';
import { TeamsServiceService } from '../teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rejected-created-user',
  templateUrl: './rejected-created-user.component.html',
  styleUrls: ['./rejected-created-user.component.scss']
})
export class RejectedCreatedUserComponent implements OnInit {

  loading = false ;
  userName = '';
    constructor(

      private teamService: TeamsServiceService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.userName =  sessionStorage.getItem('RejectedCreatedUserName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectCreatedUser() {

     this.loading = true;
      const payload = {
        username: sessionStorage.getItem('RejectedCreatedUserName')
      };
      this.teamService.rejectCreatedBankUser(payload).subscribe(
        (response: any) => {
          this.loading = false;
          switch (response.messageCode) {
                case '02':
                  this.toastr.warning(response.message);
                  break;
                case '06':
                  this.toastr.warning(response.message);
                  break;
                default:
                  this.toastr.success(response.message);
                  this.teamService.fetchInvitedTeamSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }
