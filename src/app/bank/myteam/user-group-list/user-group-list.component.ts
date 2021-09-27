import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { UserGroupDeleteComponent } from './user-group-delete/user-group-delete.component';
import { UserGroupsComponent } from '../user-groups/user-groups.component';

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.scss']
})
export class UserGroupListComponent implements OnInit {
  aa = false;
  approved = [];
  loading = false;
  listCount: any;
  groupList = [];
  rows = [];
  searchValue = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public loginService: BillersService,
    public role: RolesService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    console.log(!this.role.myTeamRole);
    this.loginService.fetchGroupSubject.subscribe(value => {
      this.getMyGroup();
    });
  }

  setIndex(ii) {
    this.aa = ii;
  }

  createUserGroup(): void {
    this.modalService.create({
      nzContent: UserGroupsComponent,
      nzFooter: null,
      nzWidth: '70vw'
    });

    // this.router.navigate(["/admin/user-groups"]);
  }

  getMyGroup() {
    // this.groupList = [];
    this.approved = [];
    const payload: any = {};

    // this.loading = true;
    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        switch (response.messageCode) {
          case '02':
            this.toastr.warning(response.message);
            break;

          default:
            response.forEach(value => {
              if (value.status == 'approved' && value.delete_groupe == 'no') {
                this.approved.push(value);
              }
            });
            // this.groupList = response;

            this.rows = this.approved;
            this.groupList = this.approved;
            this.listCount = this.groupList.length;
            break;
        }
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  deleteUserGroup(data) {
    sessionStorage.setItem('usergroup', data.name);
    sessionStorage.setItem('usergroup_id', data.group_id);

    this.modalService.create({
      nzTitle: 'Delete Group',
      nzContent: UserGroupDeleteComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

    // this.loading = true;

    // const payload:any = {
    //   group_id: data.group_id
    // };

    // this.loginService.deleteBankGroup(payload).subscribe(
    //   (response: any) => {
    //     this.loading = false;

    //     if ((response.messageCode = "00")) {
    //       this.ngOnInit();
    //       this.toastr.success(response.message, "Success");
    //     } else if ((response.messageCode = "01")) {
    //       this.toastr.warning(response.message, "Warning");
    //     } else if ((response.messageCode = "02")) {
    //       this.toastr.warning(response.message, "Warning");
    //     } else if ((response.messageCode = "03")) {
    //       this.toastr.warning(response.message, "Warning");
    //     } else if ((response.messageCode = "06")) {
    //       this.toastr.warning(response.message, "Warning");
    //     } else if ((response.messageCode = "07")) {
    //       this.toastr.warning(response.message, "Warning");
    //     }
    //   },
    //   (err: any) => {}
    // );
  }

  onRowSelect(data) {}
}
