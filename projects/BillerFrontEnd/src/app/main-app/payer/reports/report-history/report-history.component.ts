import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from 'projects/BillerFrontEnd/src/app/service/reports-service/report-service.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExportToCsv } from 'export-to-csv';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})
export class ReportHistoryComponent implements OnInit {
  rows = [];
  csvRows = [];
  reportForm: FormGroup;
  loading: boolean;
  aa = false;
  searchValue = '';

  constructor(
    public reportService: ReportServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private location: Location,
    private excelData: ExcelDataService
  ) {}

  ngOnInit() {

    this.reportForm = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });

  }

  getReconcileReports() {

    this.loading = true;
    const formData = this.reportForm.value;
    const payload = {
      fromdate: formData.from,
      todate: formData.to
    };

    this.reportService
      .getMyOldReport(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.rows = response;
        this.csvRows = response;
        if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');

        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');

        } else {}

      });
  }

  viewDetailedReport(value) {
    sessionStorage.setItem('eslip_select', value);
    this.router.navigate(['app/dashboard/report-details']);

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

    this.excelData.buildExcelReportHistory('Report History', rows);

    this.loading = false;
  }

  downloadCsv() {
    this.loading = true;
    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        created_at: value.created_at,
        eslip_no: value.eslip_no,
        amount: value.amount,
        payref: value.payref,
        corporateid: value.corporateid,
        payment_date: value.payment_date,
      };

      PushCsv.push(newCsv);
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report_History',
      filename: 'Report_History',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: [
        'Date Created',
        'Eslip No',
        'Eslip Amount',
        'Payment Ref No',
        'Corporate Id',
        'Payment Date',
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
      'Eslip Amount',
      'Payment Ref No',
      'Corporate Id',
      'Payment Date',
    ];

    const rows = [];

    /* The following array of object as response from the API req  */

    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        created_at: value.created_at,
        eslip_no: value.eslip_no,
        amount: value.amount,
        payref: value.payref,
        corporateid: value.corporateid,
        payment_date: value.payment_date,
      };
      PushCsv.push(newCsv);
    });

    PushCsv.forEach(element => {
      const temp = [
        element.created_at,
        element.eslip_no,
        element.amount,
        element.payref,
        element.corporateid,
        element.payment_date,
      ];

      console.log('t', temp);
      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Report_History.pdf');

    this.loading = false;
  }






}
