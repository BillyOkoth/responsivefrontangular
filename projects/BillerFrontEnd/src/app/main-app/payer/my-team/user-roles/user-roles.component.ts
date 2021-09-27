import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import {
  addGroup,
  getGroup,
  menus,
  menuGroup,
  menuListGroup,
  deleteUserGroup
} from '../../../../service/login.model';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  loading = false;

  groupList = [];

  userCount: any;

  menuList = [];
  userList = [];
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
  leftData = [];
  rightData = [];
  msgs = [];

  leftNameData = [];
  rightNameData = [];

  selectedId: string;
  valueSelected: any;

  menuGroup = [];
  menuS = [];

  selectedBoolean;
  selectedBoolean2;

  selectedItem = null;
  public updateForm: FormGroup;
  delete: boolean;
  update: boolean;
  add: boolean;

  addGroupForm = new FormGroup({
    groupName: new FormControl('')
  });

  ngOnInit() {
    (this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required]
    })),
      (this.updateForm = this.fb.group({
        editGroup: ['', Validators.required],
        rolesDash: ['', Validators.required]
      }));

    this.getMyGroup();

    this.fetchMenus();

    // this.fetchMenuGroup();

    this.getCompanyUsers();
  }

  // Add group
  addGroup() {
    const formData = this.addGroupForm.value;
    // this.name = newDept;

    if (this.addGroupForm.valid) {
      const payload: addGroup = {
        name: formData.groupName
      };

      this.add = true;
      this.loading = true;
      this.loginService.addGroup(payload).subscribe(
        (response: any) => {
          this.loading = false;
          this.add = false;
          this.groupid = response.id;
          this.message = response.message;
          this.messadecode = response.messageCode;

          if (response.messageCode == '00') {
            this.addGroupForm.reset();
            this.groupList.push({
              group_id: this.groupid,
              message: this.message,
              messageCode: this.messadecode,
              name:  formData.groupName
            });

            this.toastr.success(response.message, 'Success');
            this.getMyGroup();
          } else if (response.messageCode == '01') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '03') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {
          this.loading = false;

        }
      );
    }
  }

  // Fetch Groups

  getMyGroup() {
    const payload: getGroup = {};

    // this.loading = true;
    this.loginService.getMyGroup(payload).subscribe(
      (response: any) => {
        response.forEach(value => {
          value.selected = false;
        });
        this.groupList = response;

        this.listCount = response.length;
      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

  divClick(groupid: string, $index: number) {
    this.selectedBoolean = false;

    this.selectedItem = groupid;
    // this.fetchMenuGroup();

    this.groupList.forEach((value: any) => {
      value.selected = false;
    });
    this.groupList[$index].selected = true;

    /// geting the menu items.

    const payload: any = {
      group_id: this.selectedItem
    };

    this.loginService.menuGroup(payload).subscribe(
      (response: any) => {
        this.menuList = response.items;

        this.groupList.forEach(value => {
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
        });

        const selectGroupId = this.groupList.find(value => {
          return value.group_id === groupid;
        });

        this.groupName = selectGroupId.name;
        this.selectedId = selectGroupId.group_id;

        this.compareMenuResponses();
      },
      (err: any) => {

      }
    );
  }
  /// fetch menus

  fetchMenus() {
    const payload = {};

    this.loginService.getMenus(payload).subscribe((response: any) => {
      this.menuS = response;

      const resultLength = response.length;
      const divider = resultLength / 2; // we can decimal points here

      const dividerReal = parseInt(divider.toString()); // have middle number without decimal

      let counter = 1;
      let countrerLimit = 0;

      if (divider > dividerReal) {
        countrerLimit = dividerReal + 1;
      } else {
        countrerLimit = dividerReal;
      }

      response.forEach((value: any) => {
        value.selected = this.selectedBoolean;

        if (counter <= countrerLimit) {
          this.leftData.push(value);
        } else {
          this.rightData.push(value);
        }

        counter++;
      });
    });
  }

  // push the selected menus

  closeRole() {
    this.router.navigate(['app/dashboard/my-team']);
  }

  /**
   * @description: join left and right menu items then send to server
   */
  updateMenu() {
    this.msgs = [];
    const menuPayload: any = {
      menuItems: this.leftData.concat(this.rightData),
      groupName: this.groupName,
      groupId: this.selectedId,
      users: this.leftNameData.concat(this.rightNameData)
    };

    this.update = true;
    this.loading = true;

    this.loginService.addMenuGroup(menuPayload).subscribe(
      (response: any) => {
        this.loading = false;
        this.update = false;
        if (response.responseCode === '00') {
          // this.getMyGroup();
          this.ngOnInit();
          this.leftData = [];
          this.rightData = [];
          this.groupName = '';

          this.toastr.success(response.message, 'Success');
        } else if (response.responseCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else {
          this.loading = false;
          this.toastr.error('There is no server connection ');
        }
      },
      (err: any) => {

      }
    );
  }

  isSelected(item) {}

  // fetchgroup menus
  fetchMenuGroup() {
    const payload: any = {
      companyCode: sessionStorage.getItem('comp_code')
    };

    this.loginService.menuGroup(payload).subscribe(
      (response: any) => {
        this.menuList = response.items;

        response.items.forEach((value: any) => {});

        for (let i = 0; i < this.menuList.length; i++) {
          this.valueGroupId = this.menuList[i].groupId;
          this.valueGroupMenuName = this.menuList[i].groupName;

          if (this.menuList[i].groupId) {
          }
        }
      },
      (err: any) => {

      }
    );
  }

  // refresh the list
  refresh() {
    this.getMyGroup();
  }

  compareMenuResponses() {
    const menuNameGroup = [];

    this.menuList.forEach(value => {
      if (value.groupId === this.selectedId) {
        menuNameGroup.push(value.menuName);
      }
    });

    this.menuS.map(value => {
      value.selected = false;
    });

    menuNameGroup.forEach(group => {
      this.menuS.forEach(value => {
        if (group == value.menuName) {
          this.selectedBoolean = value.selected;
          value.selected = true;
        }
      });
    });

    /// for the list of users when they are selected.
    this.userList.map(value => {
      value.selected = false;
    });

    this.userList.forEach((value: any) => {
      if (value.groupId === this.selectedId) {
        this.selectedBoolean = value.selected;

        value.selected = true;
      }
    });
  }

  getCompanyUsers() {
    const payload: menus = {};
    this.loginService.getCompanyUsers(payload).subscribe((response: any) => {
      this.userList = response;

      const resultLength = response.length;
      const divider = resultLength / 2; // we can decimal points here

      const dividerReal = parseInt(divider.toString()); // have middle number without decimal

      let counter = 1;
      let countrerLimit = 0;

      if (divider > dividerReal) {
        countrerLimit = dividerReal + 1;
      } else {
        countrerLimit = dividerReal;
      }

      response.forEach(value => {
        value.selected = this.selectedBoolean;

        if (counter <= countrerLimit) {
          this.leftNameData.push(value);
        } else {
          this.rightNameData.push(value);
        }

        counter++;
      });
    });
  }

  // delete the user group

  deleteUserGroup() {
    this.groupName = '';
    this.msgs = [];
    this.delete = true;
    this.loading = true;
    const payload: deleteUserGroup = {
      id: this.selectedItem
    };

    this.loginService.deleteUserGroup(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.delete = false;

        if ((response.messageCode = '00')) {
          // this.getMyGroup();
          this.ngOnInit();
          this.leftData = [];
          this.rightData = [];
          this.groupName = '';
          this.toastr.success(response.message, 'Success');
        } else if ((response.messageCode = '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '06')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {

      }
    );
  }
}
