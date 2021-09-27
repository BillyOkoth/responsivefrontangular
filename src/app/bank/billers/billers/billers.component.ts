import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { RolesService } from '../../../core/services/roles/roles';

@Component({
  selector: 'app-billers',
  templateUrl: './billers.component.html',
  styleUrls: ['./billers.component.scss']
})
export class BillersComponent implements OnInit {
  background = 'accent';
  primary = '#022E86';
  selectedTab: number;
  billerRights;
  allRights: any;
  // allRole: any;
  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

  constructor(
    public billerService: BillersService,
    public role: RolesService
  ) {}
  ngOnInit() {
    this.findRights();
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName == 'Billers') {
        this.billerRights = element.roles;
      }
    });

    if (this.billerRights.length > 0) {
      this.billerRights.forEach(value => {
        if (value.role == 'all') {
          this.role.billerAllRoles = value.status;
        }
      });
    } else {
      this.role.billerAllRoles = true;
    }
  }

  handleChange(e) {
    this.billerService.selectedTab = e;
  }
}
