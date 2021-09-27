import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';

import { ConfirmEslipGenerationComponent } from '../../../accounts/confirm-eslip-generation/confirm-eslip-generation.component';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { UploadPaymentFileDialogComponent } from '../upload-payment-file-dialog/upload-payment-file-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  loadForm: FormGroup;
  editId: string | null;
  selectedRow = [];
  searchValue = '';

  bigList: string[] = new Array(10000).fill(0).map((_, i) => i.toString(36) + i);
  displayTips = true;

  loading: boolean;
  billerLists: any;

  payerLists: any;
  isIndeterminate = false;
  isAllDisplayDataChecked = false;
  aa = false;

  rows = [];
  cols: {}[];
  slipTotal: any;
  selectedRows: any;
  toPayTotal: any;
  length: any;
  billerCode: any;
  dueDate: any;
  billerc = '';
  payerc = '';
  biller;
  payer;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private billerService: BillersService,
    private onboardingService: OnboardingService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private excelDownload: ExcelDataService,
    private modalService: NzModalService,
    public role: RolesService
  ) {}

  ngOnInit() {

    this.loadForm = this.fb.group({
      biller: [''],
      payer: ['']
    });

    this.cols = [
      { field: 'account_no', header: 'Account No' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'amount_due', header: 'Amount To Pay' }
    ];
    this.loadForm = this.fb.group({
      payer: ['', [Validators.required]],
      biller: ['', [Validators.required]]
    });
    this.fetchUsers();
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
  loadAccounts() {
    this.loading = true;
    const formData = this.loadForm.value;

    const payload = {
      biller_code: this.biller.comp_code,
      payer_code: this.payer.comp_code
    };

    this.accountService.fetchAccounts(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
    }),
      (err: any) => {
        this.toastr.error('There is no server connection!');
      };
  }

  sumTotal() {
    let total = 0;
    this.slipTotal = 0;
    this.selectedRow.forEach((value: any) => {
      total += Number(value.amount_due);
    });

    this.slipTotal = total;
  }

  changeBiller() {

    this.billerc = this.biller.comp_code;
  }

  changePayer() {

    this.payerc = this.payer.comp_code;
  }

  // calcuate total pay

  payTotal() {

    let total = 0;
    this.toPayTotal = 0;
    this.length = this.selectedRow.length;
    this.selectedRow.forEach((value: any) => {

      total += Number(value.amount_to_pay);
    });

    const cents = total.toString();

    const decimalPoints = '0';
    const centAdded = 0;
    const centArray = cents.split('.');

    const lastSelectedRow = this.selectedRow[this.selectedRow.length - 1];

    this.toPayTotal = total;

    const roundDP = this.toPayTotal.toFixed(2);

    this.toPayTotal = roundDP;
  }

  generateEslip() {

    const billIds = [];
    const zeroValues = [];

    const eslipSelectedAccounts = JSON.parse(JSON.stringify(this.selectedRow));

    // calculate odd cents here
    const cents = this.toPayTotal.toString();
    this.accountService.oddCentsFound = false;
    this.accountService.oddCentAmount = 0;
    this.accountService.oddCentAccount = '';

    let decimalPoints = '0';
    let centAdded = 0;
    const centArray = cents.split('.');

    if (centArray.length > 1) {
      decimalPoints = centArray[1];

      let intString = decimalPoints.toString();
      let digitTwo = intString.charAt(1);
      const digitThree = intString.charAt(2) || '0';

      if (parseInt(digitThree) == 9) {
        decimalPoints += 1;

        intString = decimalPoints.toString();

        digitTwo = intString.charAt(1);
      }

      const DIGIT_TEST = parseInt(digitTwo);



      if (DIGIT_TEST > 5) {
        centAdded = (10 - DIGIT_TEST) / 100;
        this.accountService.oddCentAmount = centAdded;
        this.accountService.oddCentsFound = true;

        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .amount_to_pay
          ) + centAdded;



        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].amount_to_pay = updatedAmount.toFixed(2);
        this.accountService.oddCentAccount = this.selectedRow[
          this.selectedRow.length - 1
        ].account_no;
      } else if (DIGIT_TEST < 5 && DIGIT_TEST > 0) {
        centAdded = (5 - DIGIT_TEST) / 100;
        this.accountService.oddCentAmount = centAdded;
        this.accountService.oddCentsFound = true;



        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .amount_to_pay
          ) + centAdded;

        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].amount_to_pay = updatedAmount.toFixed(2);
        this.accountService.oddCentAccount = this.selectedRow[
          this.selectedRow.length - 1
        ].account_no;
      }
    } // end calculation

    eslipSelectedAccounts.forEach((value: any) => {
      if (value.amount_to_pay > 0) {
        const selectedAccounts = {
          account_name: value.account_name,
          account_no: value.account_no,
          amount_due: value.amount_due,
          amount_to_pay: value.amount_to_pay,
          billers_code: value.biller_code,
          due_date: value.due_date
        };
        this.billerCode = selectedAccounts.billers_code;
        this.dueDate = selectedAccounts.due_date;
        billIds.push(selectedAccounts);
      } else {
        zeroValues.push(value);
      }
    });

    const eslipPaylod: any = {
      biller_code: this.biller.comp_code,
      payer_code: this.payer.comp_code,

      total_amount_due: this.slipTotal.toString(),
      total_amount_to_pay: (
        Number(this.toPayTotal) + Number(this.accountService.oddCentAmount)
      ).toString(),
      eslipInfo: billIds
    };

    this.accountService.zeroValuesLength = zeroValues.length;
    this.accountService.accountInEslip = eslipSelectedAccounts.length;


    sessionStorage.setItem('epayload', JSON.stringify(eslipPaylod));
    this.modalService.create({
      nzTitle: 'Upload Payment File',
      nzContent: ConfirmEslipGenerationComponent,
      nzFooter: null,
      nzWidth: '50vw'
    });
  }

  editedField(event: any, row: any) {
    if (row.amount_to_pay > 0) {
      row.amount_to_pay = event.target.value;
    } else {
      row.amount_to_pay = 0;
    }

    this.payTotal();
    this.sumTotal();
  }

  onSelect() {
    this.payTotal();
    this.sumTotal();
  }

  editedTest(event: any) {
    this.payTotal();
    this.sumTotal();
  }
  startEdit(id: string, event: MouseEvent): void {
    setTimeout(() => {
      try {
        event.preventDefault();
        event.stopPropagation();
        this.editId = id;
      } catch (err) {}
    }, 500);
  }


  downloadExcel() {
    this.loading = true ;
    const rows = [...this.rows];
    this.excelDownload.buildloadedAccounts('Accounts', rows);
    this.loading = false;
  }

  uploadFileDialog() {
    const formData = this.loadForm.value;

    sessionStorage.setItem('biller_code', this.biller.comp_code);
    sessionStorage.setItem('payer_code', this.payer.comp_code);

    this.modalService.create({
      nzTitle: 'Upload Payment File',
      nzContent: UploadPaymentFileDialogComponent,
      nzFooter: null,
      nzWidth: '70vw'
    });


  }

  onSearch(value: string): void {
    if (value && value.length > 1) {
      this.billerLists = this.bigList.filter(item => item.indexOf(value) > -1);
      this.displayTips = false;
    } else {
      this.billerLists = [];
      this.displayTips = true;
    }
  }

  setIndex(ii) {
    this.aa = ii;
  }


  updateAllChecked(): void {
    this.isIndeterminate = false;
    if (this.isAllDisplayDataChecked) {

      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: true
        };
      });
      this.selectedRow = this.rows;
      this.onSelect();
    } else if (!this.isAllDisplayDataChecked) {

      this.rows = this.rows.map(item => {

        return {
          ...item,
          checked: false
        };
      });

     this.selectedRow = [];

     this.onSelect();


    }
  }

  updateSingleChecked(value) {

    if (value.checked == true) {
      this.selectedRow.push(value);


      this.onSelect();
    } else {


      this.selectedRow = this.selectedRow.filter(value => {
        return value.checked == true;
      });

      this.onSelect();
    }




  }

}
