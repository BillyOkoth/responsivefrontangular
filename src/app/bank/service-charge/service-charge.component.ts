import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-service-charge',
  templateUrl: './service-charge.component.html',
  styleUrls: ['./service-charge.component.scss']
})
export class ServiceChargeComponent implements OnInit {
  loading: boolean;
  rows: any[];
  index = 0;
  Tab: any;
  allRights;
  serviceRights;

  constructor(public eslipService: EslipsService, public role: RolesService) {}

  ngOnInit() {
    this.findRights();
  }

  handleChange(e) {
    this.eslipService.serviceTab = e;
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName == 'Service Charge') {
        this.serviceRights = element.roles;
      }
    });

    if (this.serviceRights.length > 0) {
      this.serviceRights.forEach(value => {
        if (value.role == 'all') {
          this.role.serviceRole = value.status;
        }
      });
    } else {
      this.role.serviceRole = true;
    }
  }
}
