import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { TeamsServiceService } from '../teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { RolesService } from 'src/app/core/services/roles/roles';

import { countries } from './countries';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {
  saveloading: boolean;
  restoreloading: boolean;
  freezeloading: boolean;
  selectedGroup = '';
  Fname = '';
  Lname = '';
  setEmail = '';
  groupSet = '';
  roleLists = [];
  Idset = '';
  status;
  notif;
  rows = [];
  activeusers = [];
  no_of_active_users;
  notifications;
  onfreeze = false;
  notif_value = '';
  notification = [
    { notification_id: '1', notification_name: 'Yes' },
    { notification_id: '2', notification_name: 'No' }
  ];
  setPhone = '';
  dial_code = '';

  fips_code = '';

  groupName = '';

  constructor(
    private loginService: BillersService,
    private toastr: ToastrService,
    public teamService: TeamsServiceService,
    private modalService: NzModalService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.getMyGroup();
    this.setEmail = sessionStorage.getItem('emailSet');
    this.Fname = sessionStorage.getItem('fnameSet');
    this.Lname = sessionStorage.getItem('lanameSet');
    this.groupSet = sessionStorage.getItem('groupSet');
    this.Idset = sessionStorage.getItem('idSet');
    this.status = sessionStorage.getItem('status');
    this.dial_code =
      JSON.parse(sessionStorage.getItem('val')).phone.charAt(0) === '+'
        ? JSON.parse(sessionStorage.getItem('val')).phone.substr(0, 4)
        : '+254';
    this.setPhone = JSON.parse(sessionStorage.getItem('val')).phone.substr(4);
    this.fips_code = countries.filter(
      item => item.dial_code === this.dial_code
    )[0].fips;
    // this.groupName = this.teamService.userGroup
    this.selectedGroup = sessionStorage.getItem('groupName');
    this.notif_value = sessionStorage.getItem('notification');
    this.notif = [
      { notification_id: '1', notification_name: 'Yes' },
      { notification_id: '2', notification_name: 'No' }
    ];
    if (this.notif_value === 'Y') {
      this.notifications = 'Yes';
    } else {
      this.notifications = 'No';
    }
  }

  getMyGroup() {
    const payload: {} = {};

    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        this.roleLists = response;
      },
      (err: any) => {
        this.toastr.error('There is no server connection!');
      }
    );
  }

  getBankUsers() {
    const payload: {} = {};

    this.loginService.getBankUsers(payload).subscribe(
      (response: any) => {
        this.rows = [];
        this.activeusers = [];
        response.forEach((value: any) => {
          if (value.status === 'Active') {
            this.activeusers.push(value);

            this.no_of_active_users = this.activeusers.length;

            this.rows = this.activeusers;
          }
        });
      },
      (err: any) => { }
    );
  }

  changeGroup() {
    const group = this.selectedGroup;
    this.roleLists.find(value => {
      if (value.name === group) {
        this.groupName = value.group_id;
      }
    });
  }

  updateUser() {
    if (this.groupName === '') {
      this.groupName = this.groupSet;
    }

    this.setPhone =
      this.setPhone.charAt(0) !== '+'
        ? `${this.dial_code}${this.setPhone}`
        : this.setPhone;
    this.saveloading = true;
    if (this.selectedGroup) {
      const payload: any = {
        username: this.Fname,
        other_names: this.Lname,
        group_id: this.groupName,
        email: this.setEmail,
        id: this.Idset,
        notification: this.notifications,
        phone: this.setPhone
      };

      this.loginService.editBankUsers(payload).subscribe((response: any) => {
        this.saveloading = false;
        if (response.messageCode === '00') {
          this.saveloading = false;
          this.modalService.closeAll();
          this.teamService.fetchActiveTeamSubject.next(true);
          this.toastr.success(response.message, 'Success');
          this.teamService.fetchInActiveTeamsSubject.next(true);
        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '03') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '04') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '05') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '07') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '08') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      });
    } else if (this.groupSet) {
      const payload: any = {
        username: this.Fname,
        other_names: this.Lname,
        group_id: this.groupSet,
        email: this.setEmail,
        id: this.Idset
      };

      this.loginService.editBankUsers(payload).subscribe((response: any) => {
        if (response.messageCode === '00') {
          this.saveloading = false;
          this.teamService.fetchActiveTeamSubject.next(true);
          this.toastr.success(response.message, 'Success');
          this.teamService.fetchInActiveTeamsSubject.next(true);
        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '03') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '04') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '05') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '07') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '08') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      });
    }
  }

  freezeUser() {
    const payload = {
      username: this.Fname
    };

    this.freezeloading = true;

    this.teamService.freezeUser(payload).subscribe((response: any) => {
      if (response.messageCode === '00') {
        this.freezeloading = false;
        this.onfreeze = true;

        this.teamService.fetchActiveTeamSubject.next(true);
        this.teamService.fetchInActiveTeamsSubject.next(true);
        this.modalService.closeAll();

        this.toastr.success(response.message, 'Success');
      } else if (response.messageCode === '01') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '02') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '03') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '04') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '05') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '06') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '07') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '08') {
        this.toastr.warning(response.message, 'Warning');
      } else {
      }
    });
  }

  restoreUser() {
    const payload = {
      username: this.Fname
    };
    this.restoreloading = true;

    this.teamService.restoreUser(payload).subscribe((response: any) => {
      if (response.messageCode === '00') {
        this.restoreloading = false;
        this.teamService.fetchActiveTeamSubject.next(true);
        this.teamService.fetchInActiveTeamsSubject.next(true);
        this.toastr.success(response.message, 'Success');
        this.modalService.closeAll();
      } else if (response.messageCode === '01') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '02') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '03') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '04') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '05') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '06') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '07') {
        this.toastr.warning(response.message, 'Warning');
      } else if (response.messageCode === '08') {
        this.toastr.warning(response.message, 'Warning');
      } else {
      }
    });

  }

  updateTeam() { }
}
