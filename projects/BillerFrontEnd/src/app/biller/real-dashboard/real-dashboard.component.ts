import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { BillerService } from '../../service/biller-service/biller.service';
import { BillerDashboardService } from '../services/dashboard-service/dashboard.service';
import { NzCardModule } from 'ng-zorro-antd/card';

import { GraphData } from '../services/dashboard-service/graphdata.model';

@Component({
  selector: 'app-real-dashboard',
  templateUrl: './real-dashboard.component.html',
  styleUrls: ['./real-dashboard.component.css'],
})
export class RealDashboardComponent implements OnInit {

  public eslip_paid: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public eslip_pending: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public service_charge: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public total_accounts;
  public total_accounts_to_display = this.total_accounts;
  public total_amount_due;
  public total_paid;
  public total_amount_due_to_display = this.total_amount_due;
  public total_balance_due;
  public total_balance_due_to_display = this.total_balance_due;
  public payers;

  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  public eslip_paid_data: any[] = [];

  reqPayload: any = new Object();
  switchPayerFlag = '';
  companyname = [];
  validated;

  view: any[];
  viewLine: any[] = [400, 100];
  viewPie: any[] = [450, 180];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colors = {
    domain: ['#87CEFA']
  };

  // line, area
  autoScale = true;

  data = [
    {
      name: 'Invoice Outstanding',
      value: 150,
      extra: {
        code: 'outstanding',
      },
    },
  ];

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  // };
  label = 'Total Invoices';
  animations = true;
  designatedTotal = 400;

  payerFlag = true;

  public line_data = [ ];
  public pie_data = [];

  public currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2
  });

  public numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0
  });

  constructor(private router: Router, public billerService: BillerService,
    private billerDashboardData: BillerDashboardService) {
      this.view = [1050, 300];
    }

  ngOnInit() {
    this.getDashboardData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.view = [event.target.innerWidth / 1.4, 300];
  }

  /**
   * @description:  redirect the user to the page of the closed biller
   */

  closedBillerAdmin(billerId: string): void {
    this.router.navigate(['/app/dashboard/open-biller-admin']);
  }

  /**
   * @description: take user to view all biller on the platform
   */
  viewAllBillers(): void {
    this.router.navigate(['/biller/view-billers']);
  }

  // redirect to filesUploaded

  filesUploaded(): void {
    this.router.navigate(['/app/dashboard/uploaded-file-summary']);
  }

  switchToPayer() {
    this.switchPayerFlag = 'render payer';
    sessionStorage.setItem('user-type', 'payer');
    sessionStorage.setItem('switch', this.switchPayerFlag);
    sessionStorage.getItem('comp_code');
    sessionStorage.getItem('biller-type');
    this.router.navigate(['/app/view-billers']);
  }


  getDashboardData() {
    this.billerDashboardData.getDashboardDataBiller(this.reqPayload)
      .subscribe(response => {

        this.total_accounts = this.numberFormatter.format(response[0].total_accounts);
        this.total_amount_due = this.currencyFormatter.format(response[0].total_amount_due);
        this.total_balance_due = this.currencyFormatter.format(response[0].total_balance_due);
        this.payers = this.numberFormatter.format(response[0].payers);
        this.total_paid = this.numberFormatter.format(response[0].total_paid);

        this.buildDataStructure(response[0].eslip_raised, this.eslip_paid);
        this.buildDataStructure(response[0].eslip_pending, this.eslip_pending);
        this.buildDataStructure(response[0].service_charge, this.service_charge);

        this.pie_data = [
          {
            'name': 'January',
            'value': this.service_charge[0]
          },
          {
            'name': 'February',
            'value': this.service_charge[1]
          },
          {
            'name': 'March',
            'value': this.service_charge[2]
          },
          {
            'name': 'April',
            'value': this.service_charge[3]
          },
          {
            'name': 'May',
            'value': this.service_charge[4]
          },
          {
            'name': 'June',
            'value': this.service_charge[5]
          },
          {
            'name': 'July',
            'value': this.service_charge[6]
          },
          {
            'name': 'August',
            'value': this.service_charge[7]
          },
          {
            'name': 'September',
            'value': this.service_charge[8]
          },
          {
            'name': 'October',
            'value': this.service_charge[9]
          },
          {
            'name': 'November',
            'value': this.service_charge[10]
          },
          {
            'name': 'December',
            'value': this.service_charge[11]
          }
        ];

        this.line_data = [
          {
            name: 'Paid',
            series: [
              {
                'name': 'January',
                'value': this.eslip_paid[0]
              },
              {
                'name': 'February',
                'value': this.eslip_paid[1]
              },
              {
                'name': 'March',
                'value': this.eslip_paid[2]
              },
              {
                'name': 'April',
                'value': this.eslip_paid[3]
              },
              {
                'name': 'May',
                'value': this.eslip_paid[4]
              },
              {
                'name': 'June',
                'value': this.eslip_paid[5]
              },
              {
                'name': 'July',
                'value': this.eslip_paid[6]
              },
              {
                'name': 'August',
                'value': this.eslip_paid[7]
              },
              {
                'name': 'September',
                'value': this.eslip_paid[8]
              },
              {
                'name': 'October',
                'value': this.eslip_paid[9]
              },
              {
                'name': 'November',
                'value': this.eslip_paid[10]
              },
              {
                'name': 'December',
                'value': this.eslip_paid[11]
              }
            ]
          },
          {
            name: 'Pending',
            series: [
              {
                'name': 'January',
                'value': this.eslip_pending[0]
              },
              {
                'name': 'February',
                'value': this.eslip_pending[1]
              },
              {
                'name': 'March',
                'value': this.eslip_pending[2]
              },
              {
                'name': 'April',
                'value': this.eslip_pending[3]
              },
              {
                'name': 'May',
                'value': this.eslip_pending[4]
              },
              {
                'name': 'June',
                'value': this.eslip_pending[5]
              },
              {
                'name': 'July',
                'value': this.eslip_pending[6]
              },
              {
                'name': 'August',
                'value': this.eslip_pending[7]
              },
              {
                'name': 'September',
                'value': this.eslip_pending[8]
              },
              {
                'name': 'October',
                'value': this.eslip_pending[9]
              },
              {
                'name': 'November',
                'value': this.eslip_pending[10]
              },
              {
                'name': 'December',
                'value': this.eslip_pending[11]
              }
            ]
          }
        ];

        for (let i = 0; i < this.eslip_paid.length; i++) {
          const val = (this.eslip_paid[i] === null) ? 0 : this.eslip_paid[i];
          const arr = [];
          const temp = {
            name: this.monthNames[i],
            value: val.valueOf()
          };

          arr.push(temp);
          const el = {
            name: 'Name',
            series: arr
          };

          // if (this.eslip_paid[i] === null) {
          //   this.eslip_paid_data.push(new GraphData(this.monthNames[i], 0));
          // } else {
          //   this.eslip_paid_data.push(new GraphData(this.monthNames[i], this.eslip_paid[i]));
          // }
        }


      });
  }

  buildDataStructure(data: any, arr: number[]) {
    arr[0] = (data.January === null) ? 0 : data.January;
    arr[1] = (data.February === null) ? 0 : data.February;
    arr[2] = (data.March === null) ? 0 : data.March;
    arr[3] = (data.April === null) ? 0 : data.April;
    arr[4] = (data.May === null) ? 0 : data.May;
    arr[5] = (data.June === null) ? 0 : data.June;
    arr[6] = (data.July === null) ? 0 : data.July;
    arr[7] = (data.August === null) ? 0 : data.August;
    arr[8] = (data.September === null) ? 0 : data.September;
    arr[9] = (data.October === null) ? 0 : data.October;
    arr[10] = (data.November === null) ? 0 : data.November;
    arr[11] = (data.December === null) ? 0 : data.December;
  }
  /// Fetching the list of billers.

  // Adding the accounts with regards to the biller.

  /**
   * @description:  open screen for upgrading biller
   */
}
