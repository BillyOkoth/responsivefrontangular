import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { Eslip } from 'projects/BillerFrontEnd/src/app/service/login.model';
import { NzModalService } from 'ng-zorro-antd';
import { ConfirmEslipPolicyComponent } from '../confirm-eslip-policy/confirm-eslip-policy.component';

@Component({
  selector: 'app-view-policy-file-modal',
  templateUrl: './view-policy-file-modal.component.html',
  styleUrls: ['./view-policy-file-modal.component.css']
})
export class ViewPolicyFileModalComponent implements OnInit {

  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService,
    private modalService: NzModalService
  ) { }
  fileId;
  loading = false;
  rows = [];
  searchValue = '';
  aa = false;
  length;
  outInvoice = [];
  insurance_code;
  isIndeterminate = false;
  selectedRows = [];
  selectedRow = [];
  slipTotal = 0;
  toPayTotal: any = 0;
  isAllDisplayDataChecked = false;
  billerCode;
  dueDate;

  ngOnInit() {
    this.insurance_code = sessionStorage.getItem('biller_code');
    this.fileId = sessionStorage.getItem('policyFile');
    this.getFilePolicy();

  }


  getFilePolicy() {
    this.loading = true;

    const payload = {
      file_id: this.fileId
    };
    this.billerService.getPolicyFileData(payload).subscribe(
      (response: any) => {
        console.log('policy', response);
        this.loading = false;
        this.rows = response;
      }
    );
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
   console.log('selected Ac', eslipSelectedAccounts);
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
      console.log('vaes', value);
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



  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.viewPolicyFiles('Policy File details.', rows);
    this.loading = false;
  }


}
