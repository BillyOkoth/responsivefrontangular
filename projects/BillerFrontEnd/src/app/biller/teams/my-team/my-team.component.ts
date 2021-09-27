import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import {
  GetGroup,
  FreezeUser,
  UpdateTeam,
  resendInvite
} from '../../services/user-service/user.model';
import { CreateMemberComponent } from './create-member/create-member.component';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from '../../services/biller-service/biller.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  editing = {};
  rows = [];
  cols = [];
  temp = [];
  aa = false;
  searchValue = '';
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  selectedgroupId;
  cities: [];
  selectedGroup: any;
  nameFirst: any;

  displayDialog: boolean;
  row;
  newRow: boolean;
  msgs = [];
  generatedData = [];
  SuperAdmin;

  loading = false;
  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];
  roleLists: any;
  f_name: any;
  l_name: any;
  email: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private myaccountsService: BillerService
  ) {

  }

  ngOnInit() {
    this.myaccountsService.fetchTeamsSubject.subscribe(value => {
      if (!this.loading) {
        this.getMyTeamRecords();
      }
    });

    this.cols = [
      { field: 'personel_f_name', header: 'First Name' },
      { field: 'personel_l_name', header: 'Last Name' },
      { field: 'groupDescription', header: 'User Group' },
      { field: 'frozen', header: 'Status' }
    ];


    this.SuperAdmin = sessionStorage.getItem('name_group');
  }

  // dialog for creating new member
  createNew(): void {

    this.modalService.create({
      nzTitle: 'Create Team Member',
      nzContent: CreateMemberComponent,
      nzWidth: '60%',
      nzFooter: null,
      nzMaskClosable: false
    });

  }

  // Fetch my team records
  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.userService.getCompanyUsers(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
    });
  }

  createNewGroup() {
    this.router.navigate(['/biller/user-roles']);
  }

  handleOk(): void {
    this.displayDialog = false;
  }
  handleCancel(): void {
    this.displayDialog = false;
  }

  onActivate() { }
  onSelect() { }

  save() { }
  onRowSelect(value) {
    this.newRow = false;
    this.row = this.cloneRow(value);
    this.displayDialog = true;

    this.f_name = value.personel_f_name;
    this.l_name = value.personel_l_name;
    this.email = value.email;
  }

  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }
  delete(value) {
    this.msgs = [];
    const payload: FreezeUser = {
      email: value.email
    };
    this.userService.freezeUser(payload).subscribe(
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
        } else { }
      },
    );
  }

  restore(value) {
    this.msgs = [];
    const payload: FreezeUser = {
      email: value.email
    };

    this.userService.restoreUser(payload).subscribe(
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
        } else { }
      },
    );
  }

  updateTeam(value) {
    this.msgs = [];
    this.nameFirst = value.personel_f_name;
    if (this.selectedGroup) {
      const payload: UpdateTeam = {
        id: value.id,
        group_id: this.selectedGroup.group_id,
        email: value.email,
        personel_l_name: value.personel_l_name,
        personel_f_name: value.personel_f_name
      };

      this.userService.updateTeamMembers(payload).subscribe((response: any) => {
        this.getMyTeamRecords();
      });
    } else if (value.groupId) {
      const payload: UpdateTeam = {
        id: value.id,
        group_id: value.groupId,
        email: value.email,
        personel_l_name: value.personel_l_name,
        personel_f_name: value.personel_f_name
      };

      this.userService.updateTeamMembers(payload).subscribe((response: any) => {
        this.getMyTeamRecords();

        if (response.messageCode === '00') {
          this.getMyTeamRecords();
          this.toastr.success(response.message, 'Success');
        } else if (response.messageCode === '05') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      }
      );
    } else {
    }
  }

  setIndex(ii) {
    this.aa = ii;
  }

  resendEmail(email: string) {
    this.loading = true;
    sessionStorage.setItem('emails', email);

    const payload: resendInvite = {
      email: email
    };

    this.userService.resendEmail(payload).subscribe((response: any) => {
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
    });
  }
}
