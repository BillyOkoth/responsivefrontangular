import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { AddCountryComponent } from '../../bank-settings/country/add-country/add-country.component';
import { AddBranchComponent } from '../../bank-settings/branch/add-branch/add-branch.component';
import { defaultNavItems } from './dashboard';
import { AllowedActions } from 'src/app/shared/actions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  color1 = '#0909bb';
  color2 = '#020024';
  brandTheme = `linear-gradient(to bottom, ${this.color1}, ${this.color2})`;

  panelOpenState = false;
  menuItemMenu: any;

  dashboard = '';
  mypayers = '';
  myaccount = '';
  invoices = '';
  eslips = '';
  reports = '';
  myteam = '';
  billers = '';
  isCollapsed = false;
  loading = false;

  public navItems = defaultNavItems;
  allowedMenus;
  dashMenus = [];

  userName: string;
  constructor(
    public boardingData: OnboardingService,

    private router: Router,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private actionService: AllowedActions
  ) {}

  ngOnInit() {
    this.userName = sessionStorage.getItem('username');

    this.allowedMenus = JSON.parse(sessionStorage.getItem('access'));
    this.allowedMenus.forEach(element => {
      this.navItems.forEach(value => {
        if (element === value.name) {

          this.dashMenus.push(value);
        }
      });
    });

    this.actionService.getActions();
  }

  logout() {
    this.toastr.success('You have succesfully logged out !');
    this.router.navigate(['/']);
    sessionStorage.clear();
  }

  popCountryList() {
    this.router.navigate(['/admin/country-list']);
  }
  popList() {
    this.router.navigate(['/admin/branch-list']);
  }

  popAddCountry() {
    this.modalService.create({
      nzTitle: 'Add Country',
      nzContent: AddCountryComponent,
      nzWidth: '40vw',
      nzFooter: null
    });
  }

  popBranch() {
    this.modalService.create({
      nzTitle: 'Add Branch',
      nzContent: AddBranchComponent,
      nzWidth: '40vw',
      nzFooter: null
    });
  }
  settingsPage() {
    this.router.navigate(['/admin/bank-settings']);
  }
}
