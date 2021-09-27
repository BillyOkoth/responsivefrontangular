import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
  ElementRef,
  HostListener
} from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { Eslip } from '../../../../service/login.model';
import { UploadPaymentFileDialogComponent } from '../upload-payment-file-dialog/upload-payment-file-dialog.component';
import { Router } from '@angular/router';
import { ConfirmEslipGenerationComponent } from './confirm-eslip-generation/confirm-eslip-generation.component';
import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import { ExcelDataService } from '../../../../service/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  // @ViewChild(NzInputDirective, { static: false, read: ElementRef })
  inputElement: ElementRef;
  editId: string | null;

  @HostListener('window:click', ['$event'])
  query = {};
  aa = false;
  queryBy = '$';
  editing = {};
  rows = [];
  searchValue = '';
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;
  cols;
  rows1 = [];
  clonedRows = {};
  length;
  generatedData = [];
  selectedRows = [];
  isVisible = false;
  loading = false;
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'duedata',
    'amtpay'
  ];
  slipTotal = 0;
  toPayTotal: any = 0;
  billerCode;
  dueDate;
  payments = [];
  listOfSearchName: string[] = [];
  listOfSearchAddress: string[] = [];
  listOfFilterName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
  ];
  listOfFilterAddress = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  listOfData: any[] = [];
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: string | null } = {
    name: null,
    age: null,
    address: null
  };
  sortName: string | null = null;
  sortValue: string | null = null;
  selectedRow = [];

  // new
  isIndeterminate = false;
  isAllDisplayDataChecked = false;
  constructor(
    public loginService: LoginService,
    private excelDownload: ExcelDataService,
    private router: Router,
    private toastr: ToastrService,
    private message: NzMessageService,
    private myaccountService: MyAccountsService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.generatedData = this.payments;
    this.temp = [...this.payments];
    this.rows = this.payments;

    this.getMyAccounts();
    this.cols = [
      { field: 'account_no', header: 'Account Number' },
      { field: 'account_name', header: 'Name' },
      { field: 'due_date', header: 'Due Date' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'amount_to_pay', header: 'Amount To Pay' }
    ];

    this.myaccountService.fetchEslipSubject.subscribe(value => {
      this.selectedRow = [];
    });
  }

  getMyAccounts() {
    const filtered = [];
    this.loading = true;

    this.rows = [];
    this.rows1 = [];

    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };
    this.loginService.loadPayerAccounts(payload).subscribe(response => {
      this.loading = false;

      this.payments.push(response);

      this.temp = [...response];
      this.rows = response;
      this.rows1 = response;
    }),
      (err: any) => {
        this.loading = false;
      };
  }

  generateEslip() {
    const billIds = [];
    const zeroValues = [];

    const eslipSelectedAccounts = JSON.parse(JSON.stringify(this.selectedRow));

    // calculate odd cents here
    const cents = this.toPayTotal.toString();
    this.loginService.oddCentsFound = false;
    this.loginService.oddCentAmount = 0;
    this.loginService.oddCentAccount = '';

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
        this.loginService.oddCentAmount = centAdded;

        this.loginService.oddCentsFound = true;

        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .amount_to_pay
          ) + centAdded;

        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].amount_to_pay = updatedAmount.toFixed(2);
        this.loginService.oddCentAccount = this.selectedRow[
          this.selectedRow.length - 1
        ].account_no;
      } else if (DIGIT_TEST < 5 && DIGIT_TEST > 0) {
        centAdded = (5 - DIGIT_TEST) / 100;
        this.loginService.oddCentAmount = centAdded;
        this.loginService.oddCentsFound = true;

        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .amount_to_pay
          ) + centAdded;

        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].amount_to_pay = updatedAmount.toFixed(2);
        this.loginService.oddCentAccount = this.selectedRow[
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

    const eslipPaylod: Eslip = {
      biller_code: this.billerCode,
      total_amount_due: this.slipTotal.toString(),
      total_amount_to_pay: (
        Number(this.toPayTotal) + Number(this.loginService.oddCentAmount)
      )
        .toFixed(2)
        .toString(),
      eslipInfo: billIds
    };

    this.loginService.zeroValuesLength = zeroValues.length;
    this.loginService.accountInEslip = eslipSelectedAccounts.length;

    this.modalService.create({
      nzTitle: 'Confirm E-slip Generation',
      nzContent: ConfirmEslipGenerationComponent,
      nzWidth: '50vw',
      nzFooter: null,
      nzMaskClosable: false
    });

    sessionStorage.setItem('eslip-payload', JSON.stringify(eslipPaylod));
    this.resetRows();
    this.selectedRow = [];
  }

  sumTotal() {
    let total = 0;
    this.slipTotal = 0;
    this.selectedRow.forEach((value: any) => {
      total += Number(value.amount_due);
    });

    this.slipTotal = total;
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

  /**
   * @description: open dialog to upload files
   */
  uploadFileDialog() {
    this.modalService.create({
      nzTitle: 'Upload Payment File',
      nzContent: UploadPaymentFileDialogComponent,
      nzFooter: null,
      nzWidth: '1000px',
      nzMaskClosable: false
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
  onActivate() {}

  toUploadedFile() {
    this.router.navigate(['app/dashboard/uploaded-payment-summary']);
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.buildExcelIpaymentEslip('Eslips', rows);
    this.loading = false;
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

  reset(): void {
    this.searchValue = '';
    this.searchTable();
  }

  searchTable() {}

  setIndex(ii) {
    this.aa = ii;
  }

  resetRows() {
    this.rows = this.rows.map(item => {
      return {
        ...item,
        checked: false
      };
    });
    this.isAllDisplayDataChecked = false;
    this.selectedRow = [];
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

  ngOnDestroy() {}
}
