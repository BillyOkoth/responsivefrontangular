import { Component, OnInit } from '@angular/core';
import { GetGroup } from 'src/app/core/services/billers/billers.model';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { RejectCreatedGroupComponent } from '../reject-created-group/reject-created-group.component';
import { ApproveCreatedGroupModalComponent } from '../../approve-created-group-modal/approve-created-group-modal.component';

@Component({
  selector: 'app-approve-new-group',
  templateUrl: './approve-new-group.component.html',
  styleUrls: ['./approve-new-group.component.scss']
})
export class ApproveNewGroupComponent implements OnInit {
  rows = [];
  unapproved = [];
  loading;
  searchValue = '';

  constructor(
    public loginService: BillersService,
    private toastr: ToastrService,
    public role: RolesService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.loginService.updateNewGroupSubject.subscribe(
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
        this.unapproved = [];
        switch (response.messageCode) {
          case '02':
            this.toastr.warning(response.message);
            break;

          default:
            response.forEach(value => {
              if (value.status === 'unapproved') {
                this.unapproved.push(value);
              }

            });
            this.rows = this.unapproved;
            break;
        }
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  approveGroup(value) {

    sessionStorage.setItem('ApproveCreatedGroupName', value.name);
    sessionStorage.setItem('ApproveCreatedGroupId', value.id);


    this.modalService.create({
      nzTitle: 'Approve Created Group',
      nzContent: ApproveCreatedGroupModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

  RejectGroupCreation(value) {
    sessionStorage.setItem('RejectedCreatedGroupName', value.name);
    sessionStorage.setItem('RejectedCreatedGroupId', value.id);


    this.modalService.create({
      nzTitle: 'Reject Created Group',
      nzContent: RejectCreatedGroupComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }
}
