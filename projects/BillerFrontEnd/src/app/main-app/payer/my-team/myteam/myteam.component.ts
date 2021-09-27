import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateMemberComponent } from './create-member/create-member.component';
import { LoginService } from '../../../../service/login.service';
import { Router } from '@angular/router';

import {
  getGroup,
  freezeUser,
  emailSend,
  updateMyTeam,
  resendInvite
} from '../../../../service/login.model';

import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import { TeamServiceService } from './team-service.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { UpdateTeamComponent } from './update-team/update-team.component';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {

  editing = {};
  rows = [];
  cols = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  aa = false;
  searchValue = '';
  roleLists = [];
  selectedgroupId;

  cities: [];
  selectedGroup: any;
  nameFirst: any;

  displayDialog: boolean;
  row ;
  newRow: boolean;
  msgs = [];
  generatedData = [];
  SuperAdmin;
  size = 'large';

  loading = false;
  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];
  eslipTab: any;

  listOfSearchName: string[] = [];
  listOfSearchAddress: string[] = [];
  listOfFilterName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
  ];
  listOfFilterAddress = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  listOfData: any[] = [];
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: string | null } = {
    name: null,
    age: null,
    address: null
  };
  sortName: string | null = null;
  sortValue: string | null = null;

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  search(listOfSearchName: string[], listOfSearchAddress: string[]): void {
    this.listOfSearchName = listOfSearchName;
    this.listOfSearchAddress = listOfSearchAddress;
    const filterFunc = (item: any) =>
      (this.listOfSearchAddress.length
        ? this.listOfSearchAddress.some(
            address => item.address.indexOf(address) !== -1
          )
        : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true);
    const listOfData = this.listOfData.filter((item: any) => filterFunc(item));
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.listOfDisplayData = listOfData;
    }
  }

  resetFilters(): void {
    this.listOfFilterName = [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' }
    ];
    this.listOfFilterAddress = [
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' }
    ];
    this.listOfSearchName = [];
    this.listOfSearchAddress = [];
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  resetSortAndFilters(): void {
    this.sortName = null;
    this.sortValue = null;
    this.mapOfSort = {
      name: null,
      age: null,
      address: null
    };
    this.resetFilters();
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  constructor(
    private router: Router,

    private loginService: LoginService,
    private toastr: ToastrService,
    private myaccountsService: MyAccountsService,
    private teamService: TeamServiceService,
    private modalService: NzModalService
  ) {
    this.getMyGroup();
  }

  ngOnInit() {
    this.myaccountsService.fetchTeamsSubject.subscribe(value => {
      if (!this.loading) {
        // prevent more than one request at a time ..
        this.getMyTeamRecords();
      }
    });

    this.getMyTeamRecords();
    this.cols = [
      { field: 'personel_f_name', header: 'First Name' },
      { field: 'personel_l_name', header: 'Last Name' },
      { field: 'groupDescription', header: 'User Group' },
      { field: 'frozen', header: 'Status' }
    ];
    this.getMyGroup();

    this.SuperAdmin = sessionStorage.getItem('name_group');
  }

  // dialog for creating new member
  createNew(): void {
    this.modalService.create({
      nzTitle: 'Create Team Member',
      nzContent: CreateMemberComponent,
      nzWidth: '40vw',
      nzFooter: null
    });

  }

  // dialog for editing the team member



  // Fetch my team records
  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.loginService.getCompanyUsers(payload).subscribe((response: any) => {
      this.loading = false;

      this.generatedData = response;
      this.rows = response;
    }),
      (err: any) => {

      };
  }

  createNewGroup() {
    this.router.navigate(['/app/user-roles']);
  }

  // prime ng refactors
  showDialogToAdd() {
    this.msgs = [];
    this.newRow = true;
    this.row = {};
    this.displayDialog = true;
  }
  handleOk(): void {
    this.displayDialog = false;
  }

  handleCancel(): void {
    this.displayDialog = false;
  }

  onActivate() {}
  onSelect() {}
  onRowSelect(value) {
    sessionStorage.setItem('emailSet', value.email);
    sessionStorage.setItem('fnameSet', value.personel_f_name);
    sessionStorage.setItem('lanameSet', value.personel_l_name);
    sessionStorage.setItem('groupSet', value.groupDescription.group_id);
    sessionStorage.setItem('idSet', value.id);
    this.modalService.create({
      nzTitle: 'Team Details',
      nzContent: UpdateTeamComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }
  // onRowSelect(value) {

  //   this.newRow = false;
  //   this.row = this.cloneRow(value);
  //   this.displayDialog = true;
  // }

  resendEmail(email: string) {
    this.loading = true;
    sessionStorage.setItem('emails', email);

    const payload: resendInvite = {
      email: email
    };

    this.loginService.resendEmail(payload).subscribe((response: any) => {

      this.loading = false;
      if (response.messageCode === '00') {
        this.toastr.success(response.message, 'Success');
      } else if (response.messageCode === '01') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '02') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '03') {
        this.toastr.warning(response.message, 'Warning');
      } else {
      }
    }),
      (err: any) => {

      };
  }
  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  getMyGroup() {
    const payload: getGroup = {};
    this.loginService.getMyGroup(payload).subscribe(
      (response: any) => {
        this.roleLists = response;
      },
      (err: any) => {

      }
    );
  }

  save() {}

  delete(value) {
    this.msgs = [];

    const payload: freezeUser = {
      email: value.email
    };

    this.loginService.freezeUser(payload).subscribe(
      (response: any) => {
        if ((response.messageCode = '00')) {
          this.toastr.success(response.message, 'Success');
          this.getMyTeamRecords();
        } else if ((response.messageCode = '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '05')) {

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

  restore(value) {
    this.msgs = [];
    const payload: freezeUser = {
      email: value.email
    };

    this.loginService.restoreUser(payload).subscribe(
      (response: any) => {
        if ((response.messageCode = '00')) {
          this.getMyTeamRecords();
          this.toastr.success(response.message, 'Success');
        } else if ((response.messageCode = '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '05')) {

          this.toastr.warning(response.message, 'Warning');
        }  else if ((response.messageCode = '06')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {

        this.loading = false;
      }
    );
  }

  updateTeam(value) {
    this.msgs = [];

    this.nameFirst = value.personel_f_name;

    //  this.namecomparison();

    if (this.selectedGroup) {
      const payload: updateMyTeam = {
        id: value.id,
        group_id: this.selectedGroup.group_id,
        email: value.email,
        personel_l_name: value.personel_l_name,
        personel_f_name: value.personel_f_name
      };

      this.loginService.updateTeamMembers(payload).subscribe(
        (response: any) => {
          if (response.messageCode == '00') {
            this.getMyTeamRecords();
            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          } else {
          }
        },
        (err: any) => {

        }
      );

      this.loginService.updateTeamMembers(payload).subscribe(
        (response: any) => {
          if (response.messageCode == '00') {
            this.getMyTeamRecords();

            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {

        }
      );
    } else if (value.groupId) {
      const payload: updateMyTeam = {
        id: value.id,
        group_id: value.groupId,
        email: value.email,
        personel_l_name: value.personel_l_name,
        personel_f_name: value.personel_f_name
      };

      this.loginService
        .updateTeamMembers(payload)
        .subscribe((response: any) => {
          if (response.messageCode == '00') {
            this.getMyTeamRecords();

            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          }
        });
    } else {
    }
  }

  namecomparison() {
    const sessionFirstName = sessionStorage.getItem('firstName');

    if (this.nameFirst === sessionFirstName) {
      this.myaccountsService.updateFirstName(this.nameFirst);
    } else {
    }
  }

  handleChange(e) {
    const index = e.index;
    this.eslipTab = index.toString();
    this.teamService.selectedTab = this.eslipTab;
  }
  setIndex(ii) {
    this.aa = ii;

  }
}
