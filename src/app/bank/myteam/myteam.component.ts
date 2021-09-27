import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamsServiceService } from './teams-service.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.scss']
})
export class MyteamComponent implements OnInit {
  allRights;
  teamRights;
  constructor(
    public teamService: TeamsServiceService,
    private role: RolesService
  ) {}

  ngOnInit() {
    this.findRights();
  }

  handleChange(e) {
    this.teamService.serviceTab = e;
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName == 'My Team') {
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
