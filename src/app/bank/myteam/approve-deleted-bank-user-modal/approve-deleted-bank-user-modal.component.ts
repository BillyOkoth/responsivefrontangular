import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { TeamsServiceService } from '../teams-service.service';

@Component({
  selector: 'app-approve-deleted-bank-user-modal',
  templateUrl: './approve-deleted-bank-user-modal.component.html',
  styleUrls: ['./approve-deleted-bank-user-modal.component.scss']
})
export class ApproveDeletedBankUserModalComponent implements OnInit {

  loading = false ;
  BillerName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
      public role: RolesService,
      private teamService: TeamsServiceService,
    ) { }

    ngOnInit() {
      this.BillerName = sessionStorage.getItem('ApproveDeleteBankUser');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    ApproveDeleteBankUser() {

      sessionStorage.getItem('ApproveDeleteBankUser');

     this.loading = true;
      const payload = {
        username:  sessionStorage.getItem('ApproveDeleteBankUser')
      };
      this.role.approveDeletedUser(payload).subscribe(
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




