import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { ApprovePaymentModalComponent } from 'src/app/bank/exceptions/approve-payment-modal/approve-payment-modal.component';
import { RejectEslipModalComponent } from 'src/app/bank/exceptions/reject-eslip-modal/reject-eslip-modal.component';

@Component({
  selector: 'app-approve-payment',
  templateUrl: './approve-payment.component.html',
  styleUrls: ['./approve-payment.component.scss']
})
export class ApprovePaymentComponent implements OnInit {
  loading: boolean;
  loadForm: FormGroup;
  billerLists: any;
  searchValue;

  payerLists: any;
  selectedEslip = '';
  approved: any;
  rows = [];
  cols = [];

  constructor(
    private eslipService: EslipsService,
    private toastr: ToastrService,
    public role: RolesService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.eslipService.fetchExceptions.subscribe(value => {
      this.getExceptions();
    }
    );
    this.loadForm = this.fb.group({
      biller: [''],
      payer: ['']
    });
    this.loadForm = this.fb.group({
      payer: ['', [Validators.required]],
      biller: ['', [Validators.required]]
    });

    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'amount', header: 'Amount' },
      { field: 'reference', header: 'Reference' },
      { field: 'ft', header: 'FT' },
      { field: 'eslip_no', header: 'EslipNo' }
    ];
    // this.loadAccounts()
  }

  loadAccounts() {
    const lpend = [];
    this.loading = true;
    const formData = this.loadForm.value;

    const payload = {
      biller_code: formData.biller.comp_code,
      payer_code: formData.payer.comp_code
    };

    this.accountService.getAllEslipsBank(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach((value: any) => {
        if (value.approved === 'N') {
          lpend.push(value);
          this.approved = lpend;
          this.rows = this.approved;
        } else {
        }
      });
    });
  }


  rejectEslip(value) {

    sessionStorage.setItem('rejectlipnumber', value.eslip_no);
    sessionStorage.setItem('rejectlipamount', value.amount);
    sessionStorage.setItem('rejectlipref', value.reference);
    sessionStorage.setItem('rejectpayer', value.payer_name);
    sessionStorage.setItem('ft-reject', value.ft);



    this.modalService.create({
      nzTitle: 'Reject  Eslip.',
      nzContent: RejectEslipModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

  }

  approvePayment(value) {

    sessionStorage.setItem('approveeslipnumber', value.eslip_no);
    sessionStorage.setItem('approveeslipamount', value.amount);
    sessionStorage.setItem('approveeslipref', value.reference);
    sessionStorage.setItem('approveepayer', value.payer_name);
    sessionStorage.setItem('ft-approve', value.ft);



    this.modalService.create({
      nzTitle: 'Approve Payments.',
      nzContent: ApprovePaymentModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }
  rejectPayment(value) {
    this.loading = true;
    const payload = {
      eslip_no: value.eslip_no
    };

    this.eslipService.rejectPayment(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.eslipService.fetchExceptions.next(true);
          this.toastr.success(response.message, 'Success');
        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      (err: any) => { }
    );
  }

  fetchUsers() {
    const payer = [];
    const biller = [];
    const payload = {};
    this.accountService.fetchAllUsers(payload).subscribe((response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (value.biller_type === 'payer') {
          payer.push(value);
          this.payerLists = payer;
        } else {
          biller.push(value);
          this.billerLists = biller;
        }
      });
    });
  }

  getExceptions() {
    this.loading = true;
    const ApproveExceptions = [];
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe((response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (value.status === 'InProgress') {
          ApproveExceptions.push(value);
        }
      });
      this.rows = ApproveExceptions;
    });
  }
  reconcilePayments(value) {
    this.eslipService.dateCreated = value.created_at;
    this.eslipService.eslipnumber = value.eslip_no;
    this.eslipService.ref = value.reference;
    this.eslipService.ftnumber = value.ft;
    this.eslipService.amountFt = value.amount;

  }
}
