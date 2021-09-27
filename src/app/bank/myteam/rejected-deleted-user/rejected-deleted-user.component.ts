import { Component, OnInit } from '@angular/core';
import { TeamsServiceService } from '../teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rejected-deleted-user',
  templateUrl: './rejected-deleted-user.component.html',
  styleUrls: ['./rejected-deleted-user.component.scss']
})
export class RejectedDeletedUserComponent implements OnInit {

  loading = false ;
  userName = '';
    constructor(

      private teamService: TeamsServiceService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.userName =  sessionStorage.getItem('RejectedDeleteUserName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectDeleteUser() {

     this.loading = true;
      const payload = {
        username: sessionStorage.getItem('RejectedDeleteUserName')
      };
      this.teamService.RejectdeleteBankUser(payload).subscribe(
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
                  this.teamService.fetchDeletedUserSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }
