import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { Location } from '@angular/common';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExportToCsv } from 'export-to-csv';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  loading: boolean;
  aa = false;
  payerLists: any[] = [];
  billerLists: any[];
  dateValid = false;
  disabled: boolean;

  reportForm: FormGroup;
  EslipForm;
  rows: any;
  csvRows = [];
  selectedGroup = '';
  respLength: any;
  displayTips = true;
  searchValue = '';
  searchvalue = '';
  search = '';
  biller;
  payer;
  billerc = '';
  payerc = '';
  cols: { field: string; header: string }[];
  order = 'eslip_no';

  sortName: string | null = null;
  sortValue: string | null = null;
  data;
  reverse = false;
  allRights;
  reportRights;
  disable = true;
  eslip = true;
  constructor(
    private eslipService: EslipsService,
    private location: Location,
    private accountService: AccountService,
    private fb: FormBuilder,
    private excelService: ExcelDataService,
    private toastr: ToastrService,
    public role: RolesService,
    private modalService: NzModalService,
  ) {

  }

  ngOnInit() {
    this.EslipForm = this.fb.group({
      eslipNumber: ['', [Validators.required]]
    });
    this.reportForm = this.fb.group({
      billerAlias: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
    this.fetchUsers();
    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'eslip_no', header: 'Eslip No' },
      { field: 'account_no', header: 'Account No.' },
      { field: 'bank_ref_no', header: 'Bank Ref No' },
      { field: 'biller_payment_ref', header: 'Biller Payment Ref' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'status', header: 'Status' },
      { field: 'due_date', header: 'Due Date' }
    ];

    this.cols = [
      { field: 'created_at', header: 'Date Created' },
      { field: 'eslip_no', header: 'Eslip No' },
      { field: 'account_no', header: 'Account No.' },
      { field: 'bank_ref_no', header: 'Bank Ref No' },
      { field: 'biller_payment_ref', header: 'Biller Payment Ref' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'status', header: 'Status' },
      { field: 'due_date', header: 'Due Date' }
    ];
    this.findRights();
  }

  addEslip(value) {
    if (value.length > 0) {
      this.eslip = false;
    } else {
      this.eslip = true;
    }
  }
  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName === 'Reports') {
        this.reportRights = element.roles;
      }
    });

    if (this.reportRights.length > 0) {
      this.reportRights.forEach(value => {
        if (value.role === 'all') {
          this.role.reportRole = value.status;
        }
      });
    } else {
      this.role.reportRole = true;
    }
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  changeBiller() {

    if (this.biller.comp_code.length > 0) {
      this.billerc = this.biller.comp_code;
    }

    this.disableBtn();
  }

  changePayer() {
    this.payerc = this.payer.comp_code;
  }

  disableBtn() {
    if (
      this.billerc === '' ||
      this.reportForm.value.from === '' ||
      this.reportForm.value.to === ''
    ) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }
  getReconcileReports() {
    this.loading = true;
    const formData = this.reportForm.value;
    const date1 = formData.to;

    const payload = {
      biller_code: this.billerc,
      datefrom: formData.from,
      todate: formData.to,
      payer_code: this.payerc,
      eslip_no: this.EslipForm.value.eslipNumber
    };

    this.eslipService
      .getReconcileReports(payload)
      .subscribe((response: any) => {
        this.loading = false;
        if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else {
          this.EslipForm.reset();
          this.reportForm.reset();
          this.EslipForm.value.eslipNumber = '';
          this.loading = false;
          this.rows = response;
          this.csvRows = response;
          this.data = response;
          this.respLength = response.length;
          this.loading = false;
          this.rows = response;
          this.respLength = response.length;
          this.billerLists = [];

          this.reportForm.value.from = '';
          this.reportForm.value.to = '';
          this.billerc = '';
          this.biller = null;
          this.payer = null;
          this.payerc = '';
          this.ngOnInit();
        }
      });
  }
  fetchUsers() {
    this.loading = true;
    const payer = [];
    const biller = [];
    const payload = {};
    this.accountService.fetchAllUsers(payload).subscribe((response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (value.biller_type === 'payer') {
          payer.push(value);
          this.payerLists = payer;
        } else if(value.biller_type === "biller" && value.status.toLowerCase() === "active") {
          biller.push(value);
          this.billerLists = biller;
        }
      });
    });
  }

  setIndex(ii) {
    this.aa = ii;
  }

  closeView() {
    this.location.back();
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelService.buildReports('Reports', rows).then(() => {
      this.loading = false;
    });
  }

  downloadCsv() {
    this.loading = true;
    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        created_at: value.created_at,
        eslip_no: value.eslip_no,
        account_no: value.account_no,
        bank_ref_no: value.bank_ref_no,
        biller_payment_ref: value.biller_payment_ref,
        account_name: value.account_name,
        payer_name: value.payer_name,
        amount_to_pay: value.amount_to_pay,
        status: value.status,
        expiry_date: value.expiry_date
      };

      PushCsv.push(newCsv);
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report',
      filename: 'Report',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: [
        'Date Created',
        'Eslip No',
        'Account No',
        'Bank Ref No',
        'Biller Payment Ref',
        'Account Name',
        'Payer Name',
        'Amount Paid',
        'Status',
        'Due Date'
      ]
    };
    const csvExporter = new ExportToCsv(options);
    const rows = [...PushCsv];

    csvExporter.generateCsv(rows);

    this.loading = false;
  }

  downloadPdf() {
    this.loading = true;

    const doc = new jsPDF('landscape');
    const col = [
      'Date Created',
      'Eslip No',
      'Account No',
      'Bank Ref No',
      'Biller Payment Ref',
      'Account Name',
      'Payer Name',
      'Amount Paid',
      'Status',
      'Due Date'
    ];

    const rows = [];

    /* The following array of object as response from the API req  */

    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        created_at: value.created_at,
        eslip_no: value.eslip_no,
        account_no: value.account_no,
        bank_ref_no: value.bank_ref_no,
        biller_payment_ref: value.biller_payment_ref,
        account_name: value.account_name,
        payer_name: value.payer_name,
        amount_to_pay: value.amount_to_pay,
        status: value.status,
        expiry_date: value.expiry_date
      };
      PushCsv.push(newCsv);
    });

    PushCsv.forEach(element => {
      const temp = [
        element.created_at,
        element.eslip_no,
        element.account_no,
        element.bank_ref_no,
        element.biller_payment_ref,
        element.account_name,
        element.payer_name,
        element.amount_to_pay,
        element.status,
        element.expiry_date
      ];

      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Reports.pdf');

    this.loading = false;
  }

  reportHistory(data) {

    sessionStorage.setItem('reports_comp_code', data.payer_code);
    this.modalService.create({
      nzTitle: 'Report History',
      nzContent: ReportHistoryComponent,
      nzWidth: '90%',
      nzFooter: null,
      nzMaskClosable: false
    });

    //  this.router.navigate(["/admin/reports-history"]);
  }
}
