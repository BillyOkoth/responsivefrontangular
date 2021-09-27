import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ConfirmInvoiceEslipComponent } from './confirm-invoice-eslip/confirm-invoice-eslip.component';

@Component({
  selector: 'app-invoice-per-service',
  templateUrl: './invoice-per-service.component.html',
  styleUrls: ['./invoice-per-service.component.css'],
})
export class InvoicePerServiceComponent implements OnInit {
  comp_code: any;
  isIndeterminate: boolean;
  isAllDisplayDataChecked: any;
  rows = [];
  selectedRows = [];
  checked = false;
  services = [{ id: '0' }];
  invoices;
  pendingInvoices = [];
  selection = [];
  slipTotal = 0;
  length = 0;
  toPayTotal: any = 0;
  loading = false;
  invoice_other = [
    {
      id: '',
      eslipInfo: [],
      checked: false,
      total_amount_due: 0,
      total_amount_to_pay: 0,
      biller_code: '',
    },
  ];
  sum_total = 0;
  constructor(
    private billerService: BillerService,
    private toastr: ToastrService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.comp_code = sessionStorage.getItem('biller_code');
    this.rows = [{ invoice_no: 12334, date: '123456', amount: '1000' }];
    this.invoices = JSON.parse(sessionStorage.getItem('invoiceRows'));
    this.getServices();

  }

  getServices() {
    const payload = {
      comp_code: sessionStorage.getItem('biller_code'),
    };
    this.billerService.getBillerDepartments(payload).subscribe((resp: any) => {
      resp.forEach((value) => {
        this.services.push(value);
      });
      this.buildPayload();
    });
  }

  buildPayload() {
    this.loading = true;
    const invoice = {
      id: '',
      eslipInfo: [],
      checked: false,
      total_amount_due: 0,
      total_amount_to_pay: 0,
      biller_code: '',
    };

    this.pendingInvoices = [];
    this.services.forEach((service) => {
      this.invoices.forEach((value) => {

        if (service.id === value.service_id) {
          invoice.id = service.id;

          if (
            this.invoice_other.filter((val) => val.id === service.id).length ===
            0
          ) {

            this.invoice_other.push({
              id: service.id,
              eslipInfo: [value],
              checked: false,
              total_amount_due: 0,
              total_amount_to_pay: 0,
              biller_code: '',
            });
          } else {
            this.invoice_other
              .filter((val) => val.id === service.id)[0]
              .eslipInfo.push(value);
          }
          this.loading = false;
          invoice.eslipInfo.push(value);
        }
      });
    });
  }

  updateSingleChecked(value) {
    if (value.checked == true) {
      this.selection.push(value);
      this.onSelect();
    } else {
      this.selection = this.selection.filter((value) => {
        return value.checked == true;
      });

      this.onSelect();
    }
    this.length = this.selection.length;
  }

  sumTotal() {
    let total = 0;
    this.slipTotal = 0;
    this.selection.forEach((value: any) => {
      value.eslipInfo.forEach((value) => {
        total += Number(value.amount_due);
      });
      value.total_amount_due = total.toString();
    });

    this.slipTotal = total;
    console.log('slip total', this.slipTotal);
  }

  // calcuate total pay
  payTotal() {
    let total = 0;
    this.toPayTotal = 0;
    // this.length = this.selectedRows.length;
    this.selection.forEach((value: any) => {
      value.eslipInfo.forEach((value) => {
        total += Number(value.amount_due);
      });

      value.total_amount_to_pay = total.toString();
      value.biller_code = sessionStorage.getItem('biller_code');
    });

    this.toPayTotal = total;

    const roundDP = this.toPayTotal.toFixed(2);

    this.toPayTotal = roundDP;
    console.log('to pay  total', this.toPayTotal);
  }

  completeTotal() {
    if (this.selection.length > 0) {
      this.selection.forEach((value) => {
        this.sum_total = +value.total_amount_due;
      });
    } else {
      this.sum_total = 0;
    }

  }

  onSelect() {
    this.sumTotal();
    this.payTotal();
    this.completeTotal();
  }
  generateEslip() {


    const billIds = [];
    const zeroValues = [];

    const eslipSelectedAccounts = this.selection;

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
              .total_amount_to_pay
          ) + centAdded;



        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].total_amount_to_pay = updatedAmount.toFixed(2);
        this.billerService.oddCentAccount = this.selection[
          this.selection.length - 1
        ].account_no;


      } else if (DIGIT_TEST < 5 && DIGIT_TEST > 0) {
        centAdded = (5 - DIGIT_TEST) / 100;
        this.billerService.oddCentAmount = centAdded;
        this.billerService.oddCentsFound = true;

        const updatedAmount =
          Number(
            eslipSelectedAccounts[eslipSelectedAccounts.length - 1]
              .total_amount_to_pay
          ) + centAdded;

        eslipSelectedAccounts[
          eslipSelectedAccounts.length - 1
        ].total_amount_to_pay = updatedAmount.toFixed(2);

        this.billerService.oddCentAccount = this.selection[
          this.selection.length - 1
        ].account_no;
      }
    } // end calculation

    eslipSelectedAccounts.forEach((value: any) => {
      console.log('value', value);

      if (value.amount_to_pay > 0) {

        const selectedAccounts = {
          account_name: value.account_name,
          account_no: value.account_no,
          amount_due: value.amount_due,
          amount_to_pay: value.amount_to_pay,
          billers_code: value.biller_code,
          due_date: value.due_date
        };
        // this.billerCode = selectedAccounts.billers_code;
        // this.dueDate = selectedAccounts.due_date;
        billIds.push(selectedAccounts);
        console.log('bil', billIds);
      } else {
        zeroValues.push(value);
      }
    });
    this.loading = true;
    // const payload = {
    //   selection: this.selection,
    // };

    // this.billerService.generateEslip(payload).subscribe((response: any) => {
    //   this.loading = false;

    //   this.modal.closeAll();
    //   switch (response.messageCode) {
    //     case "00":
    //       this.toastr.success(response.message);

    //       this.router.navigate(["/app/dashboard/generated-e-slip"]);

    //       break;

    //     default:
    //       this.toastr.warning(response.message);
    //       break;
    //   }
    // });

    this.billerService.zeroValuesLength = zeroValues.length;
    this.billerService.accountInEslip = eslipSelectedAccounts.length;


    this.modal.create({
      nzTitle: 'Confirm Eslip',
      nzContent: ConfirmInvoiceEslipComponent,
      nzWidth: '50vw',
      nzFooter: null,
      nzMaskClosable: false
    });

    sessionStorage.setItem('eslipInvoice-payload', JSON.stringify(this.selection));
    // this.resetRows();
    // this.selectedRow = [];




  }
}
