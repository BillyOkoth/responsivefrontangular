import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { RejectEditedGroupComponent } from '../reject-edited-group/reject-edited-group.component';
import { ApproveEditedGroupModalComponent } from '../../approve-edited-group-modal/approve-edited-group-modal.component';

@Component({
  selector: 'app-approve-edit-group',
  templateUrl: './approve-edit-group.component.html',
  styleUrls: ['./approve-edit-group.component.scss']
})
export class ApproveEditGroupComponent implements OnInit {
  rows = [];
  edited = [];
  loading;
  searchValue = '';

  constructor(
    public loginService: BillersService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    public role: RolesService,
  ) { }

  ngOnInit() {
    this.loginService.updateEditedGroupSubject.subscribe(
      value => {
        this.getMyGroup();
      }
    );


  }

  getMyGroup() {
    this.loading = true;
    const payload: {} = {};

    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.edited = [];
        switch (response.messageCode) {
          case '02':
            this.toastr.warning(response.message);
            break;

          default:
            response.forEach(value => {
              if (value.edit_group === 'yes') {
                this.edited.push(value);
              }

            });
            this.rows = this.edited;
            break;
        }
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  approveGroup(value) {

    sessionStorage.setItem('ApproveEditedGroupName', value.name);
    sessionStorage.setItem('ApproveEditedGroupId', value.group_id);
    this.loading = true;
    const payload = {
      group_id: value.group_id
    };
    this.role.approveEditingGroup(payload).subscribe(
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
            sessionStorage.setItem('Edited Response',
              JSON.stringify(response)
            );
            this.modalService.create({
              nzTitle: 'Approve Edited Group',
              nzContent: ApproveEditedGroupModalComponent,
              nzFooter: null,
              nzWidth: '40vw'
            });

            // this.role.proceedApproval(response).subscribe((response:any) => {
            //   this.toastr.success(response.message);
            //   this.getMyGroup();
            // })

            break;
        }
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  RejectGroupEdited(value) {
    sessionStorage.setItem('RejectedEditedGroupName', value.name);
    sessionStorage.setItem('RejectedEditedGroupId', value.group_id);


    this.modalService.create({
      nzTitle: 'Reject Edited Group',
      nzContent: RejectEditedGroupComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

}

