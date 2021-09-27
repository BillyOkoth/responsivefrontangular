import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { ConfirmEslipGenerationComponent } from '../../eslips/payments/confirm-eslip-generation/confirm-eslip-generation.component';
import { Eslip } from 'projects/BillerFrontEnd/src/app/service/login.model';
import { ConfirmEslipPolicyComponent } from './confirm-eslip-policy/confirm-eslip-policy.component';
import { ViewPolicyFileModalComponent } from './view-policy-file-modal/view-policy-file-modal.component';

@Component({
  selector: 'app-outstanding-policies',
  templateUrl: './outstanding-policies.component.html',
  styleUrls: ['./outstanding-policies.component.css']
})
export class OutstandingPoliciesComponent implements OnInit {

  length;
  rows = [];
  loading = false;
  outInvoice = [];
  searchValue = '';
  aa = false;
  insurance_code;
  isIndeterminate = false;
  selectedRows = [];
  selectedRow = [];
  slipTotal = 0;
  toPayTotal: any = 0;
  isAllDisplayDataChecked = false;
  billerCode;
  dueDate;


  constructor(

    private billerService: BillerService,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {

    this.insurance_code = sessionStorage.getItem('biller_code');

    this.getPolicies();

  }


  getPolicies() {

    const payload = {
      biller_code: this.insurance_code
    };

    this.rows = [];
    this.outInvoice = [];

    this.billerService.payerGetMyPolicies(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (value.status.toLowerCase() === 'pending' && value.policy_type.toLowerCase() === 'checkoff') {

            this.outInvoice.push(value);
          }
        });
        this.rows = this.outInvoice;
      }


    );
  }


  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.outstandingPolicies('Outstanding Policies', rows);
    this.loading = false;
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
    } else {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: false
        };
      });

      this.selectedRow = this.selectedRow.filter(value => {
        return value.checked == true;
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

  onSelect() {
    this.payTotal();
    this.sumTotal();
  }

  sumTotal() {
    let total = 0;
    this.slipTotal = 0;
    this.selectedRow.forEach((value: any) => {
      total += Number(value.amount);
    });

    this.slipTotal = total;
  }

  // calcuate total pay
  payTotal() {
    let total = 0;
    this.toPayTotal = 0;
    this.length = this.selectedRow.length;
    this.selectedRow.forEach((value: any) => {
      total += Number(value.amount);
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
    this.billerService.oddCentsFound = false;
    this.billerService.oddCentAmount = 0;
    this.billerService.oddCentAccount = '';

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
        this.billerService.oddCentAmount = centAdded;

        this.billerService.oddCentsFound = true;

        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .amount
          ) + centAdded;

        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].amount_to_pay = updatedAmount.toFixed(2);
        this.billerService.oddCentAccount = this.selectedRow[
          this.selectedRow.length - 1
        ].account_no;
      } else if (DIGIT_TEST < 5 && DIGIT_TEST > 0) {
        centAdded = (5 - DIGIT_TEST) / 100;
        this.billerService.oddCentAmount = centAdded;
        this.billerService.oddCentsFound = true;

        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .amount_to_pay
          ) + centAdded;

        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].amount = updatedAmount.toFixed(2);
        this.billerService.oddCentAccount = this.selectedRow[
          this.selectedRow.length - 1
        ].account_no;
      }
    } // end calculation

    eslipSelectedAccounts.forEach((value: any) => {
      if (value.amount > 0) {
        const selectedAccounts = {
          account_name: value.name,
          account_no: value.policy_no,
          amount_due: value.amount,
          amount_to_pay: value.amount,
        };
        // this.billerCode = selectedAccounts.billers_code;
        // this.dueDate = selectedAccounts.due_date;
        billIds.push(selectedAccounts);
      } else {
        zeroValues.push(value);
      }
    });

    const eslipPaylod: Eslip = {
      biller_code: this.insurance_code,
      total_amount_due: this.slipTotal.toString(),
      total_amount_to_pay: (
        Number(this.toPayTotal) + Number(this.billerService.oddCentAmount)
      )
        .toFixed(2)
        .toString(),
      eslipInfo: billIds
    };
    console.log('eslip', eslipPaylod);

    this.billerService.zeroValuesLength = zeroValues.length;
    this.billerService.accountInEslip = eslipSelectedAccounts.length;

    this.modalService.create({
      nzTitle: 'Confirm Eslip',
      nzContent: ConfirmEslipPolicyComponent,
      nzWidth: '50vw',
      nzFooter: null,
      nzMaskClosable: false
    });

    sessionStorage.setItem('Policypayload', JSON.stringify(eslipPaylod));
    // this.resetRows();
    this.selectedRow = [];
  }

  generateEslips(data) {
    console.log('eslipData', data);
    this.loading = true;

    const payload = {
      biller_code: '360',
      total_amount_due: '6960',
      total_amount_to_pay: '6960.00',
      eslipInfo: [
        {
          account_no: 'this is policy_no',
          account_name: 'put name',
          amount_due: '6960.0',
          amount_to_pay: '6960.0'
        }
      ]
    };
    this.billerService.generateEslipPolicy(payload).subscribe(
      (response: any) => {
        switch (response.messageCode) {
          case '00':
            // confirmation dialog
            this.toastr.success(response.message);
            break;
          default:
            this.toastr.warning(response.message);
            break;

        }
      }

    );


  }


  viewPolicyFiles(data) {

    sessionStorage.setItem('policyFile', data.file_id);
    this.modalService.create({
      nzTitle: 'View Policy File',
      nzContent: ViewPolicyFileModalComponent,
      nzWidth: '80vw',
      nzFooter: null,
      nzMaskClosable: false
    });

  }



}




