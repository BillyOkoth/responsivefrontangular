import { Component, OnInit} from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';
import { EmailSend } from 'src/app/core/services/onboarding/onboard.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-invited-billers',
  templateUrl: './invited-billers.component.html',
  styleUrls: ['./invited-billers.component.scss']
})
export class InvitedBillersComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  number;
  cols = [];
  no_of_invited_billers;
  searchValue = '';
  aa = false;


  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'company_name',
    'email',
    'resend',
    'delete'
  ];

  InvitedBillers = [];



  loading = false;
  disabled: boolean;
  CountInvited;
  constructor(
    private billerService: BillersService,
    private toastr: ToastrService,
    private boardSteps: BoardingStepsService,
    private router: Router,
    private role: RolesService
  ) {
    this.getBankUsers();
  }

  ngOnInit() {
    this.CountInvited = this.boardSteps.InvitedCount;

    this.cols = [
      { field: 'company_name', header: 'Company Name' },
      { field: 'comp_code', header: 'Biller Code' },
      { field: 'sector', header: 'Sector' },
      { field: 'branch', header: 'Branch' }
    ];
    this.disabled = this.role.billerAllRoles;
  }


  getBankUsers() {
    const payload = {};

    this.loading = true;
    this.billerService.getAllUsersFromBankside(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (value.status.toLowerCase() === 'invited') {
            this.InvitedBillers.push(value);
            this.no_of_invited_billers = this.InvitedBillers.length;
            this.rows = this.InvitedBillers;
          }
        });
      },
      err => {

        this.loading = false;
      }
    );
  }

  viewMore(billercode): void {
    sessionStorage.setItem('biller_code', billercode.comp_code);
    this.router.navigate(['/admin/biller-profile']);
  }

  // resend the email to the biller
  resendEmail(billerEmail): void {
    const Email = billerEmail.email;
    this.loading = true;

    const payload: EmailSend = {
      email: Email
    };
    this.boardSteps.emailSend(payload).subscribe(
      (response: any) => {
        this.loading = false;
        return response.messageCode === '00'
          ? this.toastr.success(response.message, 'Succes')
          : response.messageCode === '02'
          ? this.toastr.warning(response.message, 'Warning')
          : response.messageCode === '06'
          ? this.toastr.warning(response.message)
          : this.toastr.error(response.message);
      },
      (err: any) => {
        this.loading = false;

      }
    );
  }
  setIndex(ii) {
    this.aa = ii;
  }
}
