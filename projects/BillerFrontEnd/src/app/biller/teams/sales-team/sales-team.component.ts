import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-sales-team',
  templateUrl: './sales-team.component.html',
  styleUrls: ['./sales-team.component.css']
})
export class SalesTeamComponent implements OnInit {
sales = [];
searchValue;
loading = false;

  constructor(private team: UserService) { }

  ngOnInit(): void {
    this.getPayerBillerTeam();
  }

  getPayerBillerTeam() {
    this.loading = true;
    const payload = {};
    this.team.getTeamPayer(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.sales = response;
      }
    });
  }
}
