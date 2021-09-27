import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import {
  addGroup,
  getGroup,
  menus,
  menuListGroup
} from 'projects/BillerFrontEnd/src/app/service/login.model';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import {
  BankGroup,
  MenuGroup,
  DeleteGroup
} from 'src/app/core/services/billers/billers.model';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {

  constructor(
    public loginService: BillersService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public role: RolesService
  ) {}
  loading = false;

  groupList = [];

  userCount: any;

  menuList = [];
  userList = [];
  msgs = [];
  listCount: any;

  name: string;
  messadecode: string;
  message: string;
  groupid: string;

  groupName: string;
  groupId: string;

  dashboard: any;
  payers: any;
  myAccount: any;
  invoices: any;
  eslipsGen;
  any;
  reports: any;
  team: any;
  valueGroupId: any;
  valueGroupMenuName: any;
  valueSelected: any;
  leftData = [];
  rightData = [];

  leftNameData = [];
  rightNameData = [];

  selectedId: string;

  menuGroup = [];
  menuS;

  selectedBoolean;
  selectedBoolean2;
  clickSelect = false;

  selectedItem = '';
  public updateForm: FormGroup;
  delete: boolean;
  update: boolean;
  add: boolean;
  menus: any;
  selectedRow;
  newGroup;

  // roles

  viewOnly;
  allRights;
  approved = [];

  addGroupForm = new FormGroup({
    groupName: new FormControl('')
  });

  ngOnInit() {
    (this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required]
    })),
      (this.updateForm = this.fb.group({
        editGroup: [''],
        rolesDash: ['']
      }));

    this.getMyGroup();
    this.fetchMenus();
  }

  /// fetch menus

  fetchMenus() {
    this.loading = true;
    const payload: menus = {};

    this.loginService.getBankMenus(payload).subscribe((response: any) => {
      this.loading = false;
      this.menuS = response;
    });

  }


  getMyGroup() {

    this.approved = [];
    const payload: any = {};


    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        switch (response.messageCode) {
          case '02':
            this.toastr.warning(response.message);
            break;

          default:
            response.forEach(value => {
              if (value.status === 'approved') {
                this.approved.push(value);
              }
            });

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

  divClick(groupid: string, $index: number) {
    this.ngOnInit();
    this.selectedBoolean = false;
    this.valueSelected = false;
    this.selectedItem = groupid;

    const payload: any = {
      group_id: this.selectedItem
    };

    this.loginService.getBankMenuForGroup(payload).subscribe(
      (response: any) => {
        this.menuList = response.items;

        this.groupList.forEach(value => {
          value.selected = false;
        });

        this.groupList[$index].selected = true;

        for (let i = 0; i < this.menuList.length; i++) {
          this.valueGroupId = this.menuList[i].groupId;
          this.valueGroupMenuName = this.menuList[i].groupName;
          this.valueSelected = this.menuList[i].selected;
        }
        this.compareMenuResponses();
      },
      (err: any) => {}
    );

    const selectGroupId = this.groupList.find(value => {
      return value.group_id === groupid;
    });

    this.groupName = selectGroupId.name;
    this.selectedId = selectGroupId.group_id;
  }

  // compare menus

  compareMenuResponses() {
    this.menuS.forEach(value => {
      this.menuList.forEach(menu => {
        if (value.menuName === menu.menuName) {
          value.selected = menu.selected;
          value.rolee.forEach(role => {
            menu.roles.forEach(newRole => {
              if (newRole.role === role.role) {
                role.status = newRole.status;
              } else {
              }
            });
          });
        } else {
        }
      });
    });
  }

  // push the selected menus

  closeRole() {
    this.router.navigate(['admin/my-team']);
  }

  updateSingleChecked(value) {}

  // Add group
  addGroup() {
    const formData = this.addGroupForm.value;

    if (this.addGroupForm.valid) {
      const payload: BankGroup = {
        name: formData.groupName
      };

      this.loading = true;
      this.add = true;
      this.loginService.addBankGroup(payload).subscribe(
        (response: any) => {
          this.loading = false;
          this.add = false;

          this.groupid = response.group_id;
          this.message = response.message;
          this.messadecode = response.messageCode;

          if (response.messageCode === '00') {
            this.addGroupForm.reset();
            this.getMyGroup();
            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode === '01') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '03') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {
          this.loading = false;
        }
      );
    }
  }
  updateMenu() {
    const menuPayload: MenuGroup = {
      menuItems: this.menuS,
      groupName: this.groupName,
      groupId: this.selectedId
    };

    this.loading = true;
    this.update = true;

    this.loginService
      .addbankMenuToGroup(menuPayload)
      .subscribe((response: any) => {
        this.loading = false;
        this.update = false;

        if ((response.responseCode = '00')) {
          this.ngOnInit();
          this.leftData = [];
          this.rightData = [];
          this.groupName = '';

          this.toastr.success(response.message, 'Success');
        } else if (response.responseCode !== '00') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      });
  }

  isSelected(item) {}

  // delete the user group

  deleteUserGroup() {
    this.groupName = '';
    this.msgs = [];
    this.loading = true;
    this.delete = true;
    const payload: DeleteGroup = {
      group_id: this.selectedItem
    };

    this.loginService.deleteBankGroup(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.delete = false;

        if ((response.messageCode === '00')) {
          this.ngOnInit();
          this.leftData = [];
          this.rightData = [];
          this.groupName = '';
          this.toastr.success(response.message, 'Success');
        } else if ((response.messageCode === '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode === '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode === '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode === '06')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode === '07')) {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {}
    );
  }
}
