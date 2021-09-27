import { Component, OnInit, ViewChild } from '@angular/core';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-pay-on-behalf',
  templateUrl: './pay-on-behalf.component.html',
  styleUrls: ['./pay-on-behalf.component.scss']
})
export class PayOnBehalfComponent implements OnInit {
  editing = {};
  rows = [];
  cols = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  selectedgroupId;

  cities: [];
  selectedGroup: any;
  nameFirst: any;

  displayDialog: boolean;
  row = {};
  newRow: boolean;
  msgs = [];
  generatedData = [];

  loading = false;
  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];
  eslipTab: any;
  allRights: any;
  eslipRights;

  constructor(
    private myaccountsService: MyAccountsService,
    public accountService: AccountService,
    public eslipService: EslipsService,
    public role: RolesService
  ) {
    // this.getMyGroup();
  }

  ngOnInit() {
    this.myaccountsService.fetchTeamsSubject.subscribe(value => {
      if (!this.loading) {
      }
    });

    this.cols = [
      { field: 'personel_f_name', header: 'First Name' },
      { field: 'personel_l_name', header: 'Last Name' },
      { field: 'groupDescription', header: 'User Group' },
      { field: 'frozen', header: 'Status' }
    ];
    this.findRights();
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName == 'Eslip') {
        this.eslipRights = element.roles;
      }
    });

    if (this.eslipRights.length > 0) {
      this.eslipRights.forEach(value => {
        if (value.role == 'all') {
          this.role.eslipRole = value.status;
        }
      });
    } else {
      this.role.eslipRole = true;
    }
  }

  // prime ng refactors
  showDialogToAdd() {
    this.msgs = [];
    this.newRow = true;
    this.row = {};
    this.displayDialog = true;
  }

  onActivate() { }
  onSelect() { }

  onRowSelect(value) {
    this.newRow = false;
    this.row = this.cloneRow(value.data);
    this.displayDialog = true;
  }

  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  save() { }

  handleChange(e) {
    this.eslipService.selectedTab = e;
  }
}
