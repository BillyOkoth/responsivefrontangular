import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { RejectDeletedGroupComponent } from '../reject-deleted-group/reject-deleted-group.component';
import { ApproveDeletedGroupModalComponent } from '../../approve-deleted-group-modal/approve-deleted-group-modal.component';

@Component({
  selector: 'app-approve-deleted-group',
  templateUrl: './approve-deleted-group.component.html',
  styleUrls: ['./approve-deleted-group.component.scss']
})
export class ApproveDeletedGroupComponent implements OnInit {
  rows = [];
  approved = [];
  loading;
  searchValue = '';
  constructor(
    public loginService: BillersService,
    private toastr: ToastrService,
    public role: RolesService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.loginService.updateDeletedGroupSubject.subscribe(
      value => {
        this.getMyGroup();
      }
    );

  }

  getMyGroup() {
    this.loading = true;
    const payload: {} = {};

    // this.loading = true;
    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.approved = [];
        switch (response.messageCode) {
          case '02':
            this.toastr.warning(response.message);
            break;

          default:
            response.forEach(value => {
              if (value.delete_groupe === 'yes') {
                this.approved.push(value);
              }
            });
            this.rows = this.approved;
            break;
        }
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  deleteGroup(value) {

    sessionStorage.setItem('ApproveDeleteGroupName', value.name);
    sessionStorage.setItem('ApproveDeleteGroupId', value.group_id);


    this.modalService.create({
      nzTitle: 'Approve Deleted Group',
      nzContent: ApproveDeletedGroupModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
    // this.loading = true;
    // const payload = {
    //   group_id: value.group_id
    // };
    // this.role.deleteBankGroup(payload).subscribe(
    //   (response: any) => {
    //     this.loading = false;
    //     switch (response.messageCode) {
    //       case "02":
    //         this.toastr.warning(response.message);
    //         break;
    //       case "06":
    //         this.toastr.warning(response.message);
    //         break;
    //       default:
    //         this.toastr.success(response.message);
    //         this.getMyGroup();
    //         break;
    //     }
    //   },
    //   (err: any) => {
    //     this.loading = false;
    //   }
    // );
  }

  RejectGroupDelete(value) {
    sessionStorage.setItem('RejectedDeleteGroupName', value.name);
    sessionStorage.setItem('RejectedDeleteGroupId', value.group_id);


    this.modalService.create({
      nzTitle: 'Reject Deleted Group',
      nzContent: RejectDeletedGroupComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

  }

