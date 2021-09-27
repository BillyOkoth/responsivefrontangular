import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { TeamsServiceService } from '../teams-service.service';

@Component({
  selector: 'app-rejected-edited-user',
  templateUrl: './rejected-edited-user.component.html',
  styleUrls: ['./rejected-edited-user.component.scss']
})
export class RejectedEditedUserComponent implements OnInit {

  loading = false ;
  userName = '';
    constructor(

      private teamService: TeamsServiceService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.userName =  sessionStorage.getItem('RejectedUserName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectEditedUser() {

     this.loading = true;
      const payload = {
        username: sessionStorage.getItem('RejectedUserName')
      };
      this.teamService.RejectEditedBankUsers(payload).subscribe(
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
                  this.teamService.fetchEditedUserSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }
