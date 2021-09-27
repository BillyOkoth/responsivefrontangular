import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { TeamsServiceService } from '../teams-service.service';

@Component({
  selector: 'app-approve-edited-group-modal',
  templateUrl: './approve-edited-group-modal.component.html',
  styleUrls: ['./approve-edited-group-modal.component.scss']
})
export class ApproveEditedGroupModalComponent implements OnInit {

  loading = false ;
  BillerName = '';
  theResponse;
  menuName;
  roleAll;
  allStatus;
  viewStatus;
  roleView;
  Accord;
  RoleList;
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
      public role: RolesService,
      private teamService: TeamsServiceService,
    ) { }

    ngOnInit() {

      this.theResponse = JSON.parse(sessionStorage.getItem('Edited Response'));
      this.BillerName =  sessionStorage.getItem('ApproveEditedGroupName');

      this.Accord =  this.theResponse.menuItems;

      // this.RoleList = this.theResponse.roles;


      this.theResponse.menuItems.forEach(

        (value: any) => {
          console.log('rol', value.roles);

          this.RoleList = value.roles;









      });
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    ApproveEditedGroup() {

      sessionStorage.getItem('ApproveEditedGroupName');
      sessionStorage.getItem('ApproveEditedGroupId');

      this.role.ProceedAproval(this.theResponse).subscribe(
        (response: any) => {
        this.loading = false;
              switch (response.messageCode) {
                    case '02':
                      this.toastr.warning('Warning', response.message);
                      break;
                    case '06':
                      this.toastr.warning('Warning', response.message);
                      break;
                    default:
                      this.toastr.success('Success', response.message);
                      this.billerService.updateEditedGroupSubject.next(true);
                      this.modalService.closeAll();
                      break;
                  }

            });

    //  this.loading = true;
    //   const payload = {
    //     group_id: sessionStorage.getItem('ApproveEditedGroupId')
    //   };
    //   this.role.approveEditingGroup(payload).subscribe(
    //     (response:any)=>{
    //       this.loading = false;
    //       switch (response.messageCode) {
    //             case "02":
    //               this.toastr.warning(response.message);
    //               break;
    //             case "06":
    //               this.toastr.warning(response.message);
    //               break;
    //             default:
    //               this.toastr.success(response.message);
    //               this.billerService.updateEditedGroupSubject.next(true);
    //               this.modalService.closeAll();
    //               break;
    //           }

    //     }
    //   )

    }
    }



