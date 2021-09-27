import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { Token } from '../../../../service/login.model';
import { UpgradeToBillerComponent } from '../../../upgrade-to-biller/upgrade-to-biller.component';
import { BillerService } from '../../../../service/biller-service/biller.service';
import { DashboardStats } from '../../../../service/biller-service/biller.model';

import { ToastrService } from 'ngx-toastr';
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';



@Component({
  selector: 'app-real-dashboard',
  templateUrl: './real-dashboard.component.html',
  styleUrls: ['./real-dashboard.component.css']
})
export class RealDashboardComponent implements OnInit {
  myaccount = '';
  eslips = '';

  // trial
  brandTheme = '#0033A1';
  companyname = [];
  validated;
  noInvoices = true;

  label = 'Total Invoices';
  animations = true;
  designatedTotal = 400;

  payerFlag = true;
  loading: boolean;
  user_type: string;
  shortcuts: any;

  // dashboard stats

  total_accounts;
  total_amount_due;
  total_balance_due;
  total_paid;

  // keys
  names;
  values;
  reportAccountsArray = [];
  reportTablesArray = [];
  accountsArray = [];
  amountToPayArray = [];
  tablesArray = [];
  datas: any;
  piegrid: { name: string; value: number }[];
  showPayerBillerButton: boolean;

  // ngx charts
  single: any[];
  multi: any[];

  horizontalBarData: any[];

  // options
  horizontalBarShowXAxis = true;
  horizontalBarShowYAxis = true;
  horizontalBarShowLegend = true;
  horizontalBarShowXAxisLabel = true;
  horizontalBarXAxisLabel = 'Number of invoices';
  horizontalBarShowYAxisLabel = true;
  horizontalBarYAxisLabel = 'Days To Due Date';

  horizontalBarcolorScheme = {
    domain: ['#5AA454', '#C7B42C', '#A10A28', '#AAAAAA']
  };

  horizontalBarView: any[] = [1000, 250];
  value = 0;
  previousValue = 30;
  units = 'Days';
  view: any[] = [700, 400];
  view1: any[] = [500, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Amount';
  showYAxisLabel = true;
  yAxisLabel = 'Month';

  colorScheme = {
    domain: ['#E1B0A2', '#A5CAD2']
  };
  colorScheme1 = {
    domain: ['#F9EBB1', '#C87CCB']
  };

  // line, area
  autoScale = true;
  month: any = {};
  eslipdata: any;
  mnth = {
    name: '',
    series: []
  };

  biller;
  rate;
  currency;
  constructor(
    private router: Router,
    private loginService: LoginService,
    public billerService: BillerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getDashboardDetails();
    this.getInvoices();
    this.myaccount = sessionStorage.getItem('My_Account');
    this.eslips = sessionStorage.getItem('eslips');

    if (sessionStorage.getItem('switch') === 'render payer') {
      this.showPayerBillerButton = true;
    } else {
      this.showPayerBillerButton = false;
    }

    this.getActiveBillers();
    this.biller = sessionStorage.getItem('biller-type').toLowerCase();
    this.user_type = sessionStorage.getItem('user-type');
    this.validated = this.loginService.validated;
    this.shortcuts = [
      { name: 'Add Accounts', link: '/app/dashboard/open-biller-admin' },

      { name: 'Upload Payment', link: '/app/dashboard/generated-e-slip' }
    ];

    this.multi = [];

    this.rate = sessionStorage.getItem('rate'),
    this.currency = sessionStorage.getItem('currency');
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
    this.router.navigate(['/app/view-billers']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.horizontalBarView = [event.target.innerWidth / 1.4, 250];
  }

  // redirect to filesUploaded

  filesUploaded(): void {
    this.router.navigate(['/app/dashboard/uploaded-file-summary']);
  }
  /// Fetching the list of billers.
  getActiveBillers() {
    this.loading = true;
    const payload: Token = {};

    this.loginService.loadActiveBillers(payload).subscribe(response => {
      this.loading = false;

      this.companyname = response;
    }),
      (err: any) => {

      };
  }

  navigate(value) {
    this.router.navigate([value.link]);
  }

  /**
   * @description:  open screen for upgrading biller
   */

  // skipCustomization() {
  //   const dialogRef = this.dialog.open(UpgradeToBillerComponent, {
  //     width: '70vw',
  //     data: { name: 'this.name' }
  //   });
  // }

  myXAxisTickFormatting(val) {
    if(val % 1 == 0){
      return val;
    } else {
      return '';
    }
  }

  getInvoices() {
    const oneDay = 24 * 60 * 60 * 1000;
    this.billerService.getInvoicesPayer({biller_code: sessionStorage.getItem('biller_code')}).subscribe((response) => {
      let green = 0;
      let yellow = 0;
      let red = 0;
      let done = false;
      response.forEach((item, index) => {
        this.noInvoices = false;
        if (!response[index + 1]) { done = true; }
        if (item.status.toLowerCase() === 'pending') {
          const due_date = new Date(item.due_date);
          const upload_date = new Date(item.created_at);
          if (Math.round(+due_date - +upload_date) / oneDay < 30) {
            green = green + 1;
          } else if (Math.round(+due_date - +upload_date) / oneDay < 60) {
            yellow = yellow + 1;
          } else {
            red = red + 1;
          }
        }
      });
      if (done) {
        this.horizontalBarData = [{
          'name': 'Under 30 days',
          'value': green
        },
        {
          'name': 'Between 30-60 days',
          'value': yellow
        },
        {
          'name': 'Over two months',
          'value': red
        }];
      }
    });
  }

  getDashboardDetails() {
    const newArr = [];
    let keys = [];
    let pending = [];
    let raised = [];
    const payload: DashboardStats = {
      biller_code: sessionStorage.getItem('biller_code')
    };
    this.loading = true;
    this.billerService
      .fetchDashboardStats(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.total_accounts = response[0].total_accounts;
        // this.total_amount_due = response[0].total_amount_due.toFixed(2);
        this.total_amount_due = response[0].eslip_on_pending;
        this.total_balance_due = response[0].total_balance_due.toFixed(2);
        this.total_paid = response[0].eslip_on_paid;
        keys = Object.keys(response[0].eslip_pending);
        pending = Object.values(response[0].eslip_pending);
        raised = Object.values(response[0].eslip_raised);
        // for (let i = 0; i < keys.length; i++) {
        //   this.month = { name: keys[i] };
        //   newArr.push(this.month);
        // }
        // newArr.forEach((value, $index) => {
        //   value.value = Number(pending[$index]);
        // });

        // this.multi = newArr;
        for (let i = 0; i < keys.length; i++) {
          this.mnth = { name: keys[i], series: [] };
          newArr.push(this.mnth);
        }

        newArr.forEach((value, $index) => {
          const pending_acc = { name: 'Paid', value: Number(pending[$index]) };
          value.series.push(pending_acc);
        });
        newArr.forEach((value, $index) => {
          const raised_acc = { name: 'Raised', value: Number(raised[$index]) };
          value.series.push(raised_acc);
        });

        this.multi = newArr;


        this.eslipdata = [
          { name: 'Eslips Paid', value: response[0].eslip_on_paid },
          {
            name: 'Eslips Pending',
            value: response[0].eslip_on_pending
          }
        ];
      }),
      (err: any) => {
        this.toastr.error('There is no server connectioin !');
      };
  }

  changeToBiller() {
    sessionStorage.setItem('user-type', 'biller');
    this.router.navigate(['/biller/dashboard']);
  }
}
