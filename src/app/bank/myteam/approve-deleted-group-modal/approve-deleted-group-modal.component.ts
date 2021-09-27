import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { TeamsServiceService } from '../teams-service.service';

@Component({
  selector: 'app-approve-deleted-group-modal',
  templateUrl: './approve-deleted-group-modal.component.html',
  styleUrls: ['./approve-deleted-group-modal.component.scss']
})
export class ApproveDeletedGroupModalComponent implements OnInit {

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
      this.BillerName =  sessionStorage.getItem('ApproveDeleteGroupName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    ApproveDeletedGroup() {

      sessionStorage.getItem('ApproveEditedGroupName');
      sessionStorage.getItem('ApproveDeleteGroupId');



     this.loading = true;
      const payload = {
        group_id: sessionStorage.getItem('ApproveDeleteGroupId')
      };
      this.role.deleteBankGroup(payload).subscribe(
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
                  this.billerService.updateDeletedGroupSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



