import { Component, OnInit } from '@angular/core';
import { TeamsServiceService } from '../teams-service.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-user-group-tab',
  templateUrl: './user-group-tab.component.html',
  styleUrls: ['./user-group-tab.component.scss']
})
export class UserGroupTabComponent implements OnInit {
  allRights;
  teamRights;
  constructor(
    public teamService: TeamsServiceService,
    private role: RolesService
  ) {

    // this.findRights();
  }

  ngOnInit() {
    this.findRights();

  }

  handleChange(e) {
    this.teamService.serviceTab = e;
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName == 'User Groups') {
        this.teamRights = element.roles;
      }
    });

    if (this.teamRights.length > 0) {
      this.teamRights.forEach(value => {
        if (value.role == 'all') {
          this.role.myTeamRole = value.status;
        }
      });
    } else {
      this.role.myTeamRole = true;
    }
  }
}
