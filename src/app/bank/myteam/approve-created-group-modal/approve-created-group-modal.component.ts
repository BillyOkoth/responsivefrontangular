import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { TeamsServiceService } from '../teams-service.service';

@Component({
  selector: 'app-approve-created-group-modal',
  templateUrl: './approve-created-group-modal.component.html',
  styleUrls: ['./approve-created-group-modal.component.scss']
})
export class ApproveCreatedGroupModalComponent implements OnInit {

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
      this.BillerName =  sessionStorage.getItem('ApproveCreatedGroupName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    ApproveBankGroup() {
      sessionStorage.getItem('ApproveCreatedGroupName');
       sessionStorage.getItem('ApproveCreatedGroupId');

     this.loading = true;
      const payload = {
        id:  sessionStorage.getItem('ApproveCreatedGroupId')
      };
      this.role.approveBankGroup(payload).subscribe(
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
                  this.billerService.updateNewGroupSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



