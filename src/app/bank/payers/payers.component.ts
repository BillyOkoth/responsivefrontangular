import { Component, OnInit, ViewChild } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { LoginService } from 'src/app/bank/home-page/login.service';
import { ConfirmBiller } from 'src/app/core/services/onboarding/onboard.model';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { PayerService } from 'src/app/core/services/payers/payer.service';
import { NzModalService } from 'ng-zorro-antd';
import { PayerTeamComponent } from './payer-team/payer-team.component';
export interface InvoiceRaised {
  invoice_desc: string;
  invoice_number: number;
  amount: number;
  company_invoiced: string;
}

@Component({
  selector: 'app-payers',
  templateUrl: './payers.component.html',
  styleUrls: ['./payers.component.scss']
})
export class PayersComponent implements OnInit {
  rows = [];
  cols = [];
  billerForm: FormGroup;

  loading = false;
  payers = [];
  no_of_payers;
  payerLists = [];
  billerLists = [];
  selected = [];
  searchValue = '';
  selectedGroup;
  displayTips = true;
  comp_code = '';
  payerRole;

  constructor(
    public boardingData: OnboardingService,
    public billersService: BillersService,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private excelDownload: ExcelDataService,
    public payer: PayerService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.billerForm = this.fb.group({
      biller: ['', [Validators.required]]
    });

    this.payerRole = JSON.parse(sessionStorage.getItem('menuRights')).rights;
  }

  ngOnDestroy(): void {
    this.payerLists = [];
    this.billerLists = [];
  }

  changeBiller() {
    this.comp_code = this.selectedGroup.comp_code;
  }

  fetchUsers() {
    const payer = [];
    const biller = [];

    const payload = {};
    this.accountService.fetchAllUsers(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach(value => {
        if (value.biller_type == 'payer') {
          payer.push(value);
          this.payerLists = payer;
        } else if(value.biller_type === "biller" && value.status.toLowerCase() === "active"){
          biller.push(value);
          this.billerLists = biller;
        }
      });
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }

  getPerBiller() {
    const payer = [];
    const biller = [];
    this.rows = [];
    this.loading = true;

    this.comp_code = this.selectedGroup.comp_code;
    const payload = {
      biller_code: this.selectedGroup.comp_code
    };

    this.accountService
      .getPayersPerBiller(payload)
      .subscribe((response: any) => {
        this.loading = false;

        response.forEach(value => {
          if (value.biller_type == 'payer' ) {
            payer.push(value);
            this.rows = payer;
          }
        });
      });
  }

  getBankUsers() {
    const payer = [];
    const payload = {};

    this.loading = true;
    this.billersService.getAllUsersFromBankside(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach(value => {
          if (value.user_type === 'payer') {
            payer.push(value);
            this.payers = payer;
            this.no_of_payers = this.payers.length;
          }
        });
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  fetchPayers() {
    const payload: ConfirmBiller = {};

    this.boardingData.fetchPayers(payload).subscribe((response: any) => {
      this.loading = false;

      this.rows = response;
    });
  }

  viewMore(billercode): void {
    sessionStorage.setItem('code', billercode.comp_code);
    this.router.navigate(['/admin/payer-profile']);
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.buildExcelPayers('Payers', rows);
    this.loading = false;
  }

  viewTeam(value) {

    sessionStorage.setItem('comp_code', value.comp_code);
    this.modal.create({
      nzTitle: 'Payer Team',
      nzContent: PayerTeamComponent,
      nzWidth: '70%',
      nzBodyStyle: {height: '100%'},
      nzFooter: null
    });
    // this.router.navigate(['admin/payer-team'])
  }
}
