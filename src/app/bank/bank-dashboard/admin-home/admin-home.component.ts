import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';

import { Token } from '../../../core/services/billers/billers.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  reqPayload: any = new Token();

  public currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2
  });

  public numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0
  });

  active_billers;
  accounts='0';
  amount_charged_pending='0';
  pending_billers;
  invited_billers;
  active_payers;
  pending_payers;
  inactive_payers;
  eslip_paid;
  eslip_pending;
  amount_charged_paid='0';
  exceptions='0';
  continue: boolean;

  esbSpeeds: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  kplcSpeeds: number[] = [
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 1000
  ];
  public averageKPLCSpeed;
  public averageESBSpeed;

  public systemGraph = [];
  items: Array<any> = [];
  activeCount;
  pendingCount;
  invitedCount;

  sliderArray = [];

  view: any[] = [400, 300];
  viewLine: any[] = [600, 150];
  viewPie: any[] = [450, 180];

  // options for the chart

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  timeline = true;
  explodeSlices = false;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  twoColors = {
    domain: ['#9370DB', '#FA8072']
  };

  // pie
  showLabels = false;

  // data goes here
  public users;
  public eslips_dashboard;

  public single = [];
  // refresh_id: NodeJS.Timer;

  constructor(
    private router: Router,
    private billerService: BillersService,
    private boardSteps: BoardingStepsService,
    private dashBoardService: DashboardService
  ) {
    this.items = [];
    // this is to get the count for active billers.

    this.billerService.allBillersFn().subscribe(response => {
      this.activeCount = response.Active;
      this.invitedCount = response.Invited;
      this.pendingCount = response.Pending;

      this.boardSteps.activeCount = response.Active;
      this.boardSteps.InvitedCount = response.Invited;
      this.boardSteps.pendingCount = response.Pending;
    });
  }

  ngOnInit() {
    this.continue = true;
    this.getDashBoardData();
  }

  // Navigate the user to child page
  toChild(url: string) {
    switch (url) {
      case 'admin/billers/active-billers':
        this.billerService.selectedTab = 0;
        break;
      case 'admin/billers/pending-billers':
        this.billerService.selectedTab = 1;
        break;
      case 'admin/billers/invited-billers':
        this.billerService.selectedTab = 2;
        break;
    }
    this.router.navigate([url]);
  }

  getDashBoardData() {
    this.dashBoardService
      .getDashBoardDataBank(this.reqPayload)
      .subscribe(response => {
        this.accounts = this.numberFormatter.format(response.accounts);
        this.active_billers = response.active_billers;
        this.amount_charged_pending = this.currencyFormatter.format(
          response.amount_charged_pending
        );
        this.pending_billers = response.pending_billers;
        this.invited_billers = response.invited_billers;
        this.active_payers = response.active_payers;
        this.eslip_paid = response.eslip_paid;
        this.eslip_pending = response.eslip_pending;
        this.amount_charged_paid = this.currencyFormatter.format(
          response.amount_charged_paid
        );
        this.inactive_payers = response.inactive_payers;
        this.pending_payers = response.pending_payers;
        this.exceptions = this.numberFormatter.format(response.exceptions);
        this.users = [
          {
            name: 'Billers',
            series: [
              {
                name: 'Active',
                value: this.active_billers
              },
              {
                name: 'Invited',
                value: this.invited_billers
              },
              {
                name: 'Inactive',
                value: this.invited_billers
              }
            ]
          },
          {
            name: 'Payers',
            series: [
              {
                name: 'Active',
                value: this.active_payers
              },
              {
                name: 'Invited',
                value: this.pending_payers
              },
              {
                name: 'Inactive',
                value: this.inactive_payers
              }
            ]
          }
        ];

        this.eslips_dashboard = [
          {
            name: 'Paid',
            value: this.eslip_paid
          },
          {
            name: 'Pending',
            value: this.eslip_pending
          }
        ];
      });
  }

  getSystemMonitoring() {
    this.dashBoardService
      .getSystemMonitoring(this.reqPayload)
      .subscribe(response => {
        this.kplcSpeeds.reverse().pop();
        this.kplcSpeeds.reverse().push(response.kplctime);
        this.averageKPLCSpeed = this.numberFormatter.format(
          this.average(this.kplcSpeeds)
        );
        this.averageESBSpeed = this.numberFormatter.format(
          this.average(this.esbSpeeds)
        );
        this.systemGraph = [
          {
            name: 'KPLC Speed',
            series: [
              {
                name: 'time 0',
                value: this.kplcSpeeds[9]
              },
              {
                name: 'time 1',
                value: this.kplcSpeeds[8]
              },
              {
                name: 'time 2',
                value: this.kplcSpeeds[7]
              },
              {
                name: 'time 3',
                value: this.kplcSpeeds[6]
              },
              {
                name: 'time 4',
                value: this.kplcSpeeds[5]
              },
              {
                name: 'time 5',
                value: this.kplcSpeeds[4]
              },
              {
                name: 'time 6',
                value: this.kplcSpeeds[3]
              },
              {
                name: 'time 7',
                value: this.kplcSpeeds[2]
              },
              {
                name: 'time 8',
                value: this.kplcSpeeds[1]
              },
              {
                name: 'time 9',
                value: this.kplcSpeeds[0]
              }
            ]
          }

        ];
      });
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 4, 180];
  }

  average(arr): number {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += parseFloat(String(arr[i]));
    }
    return total / arr.length;
  }

  // ngOnDestroy() {
  //   this.continue = false;
  // }
  // ngOnDestroy() {
  //   clearInterval(this.refresh_id);
  // }
}
