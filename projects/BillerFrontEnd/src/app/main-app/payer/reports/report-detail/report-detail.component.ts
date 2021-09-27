import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from 'projects/BillerFrontEnd/src/app/service/reports-service/report-service.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
import jsPDF from 'jspdf';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  eslipValue;
  loading: boolean;
  rows = [];
  aa = false;
  searchValue = '';
  csvRows = [];

  constructor(
    public reportService: ReportServiceService,
    private toastr: ToastrService,
    private location: Location,
    private excelData: ExcelDataService
  ) { }

  ngOnInit() {

   this.eslipValue =  sessionStorage.getItem('eslip_select');
   this.getReportDetails();
  }

  getReportDetails() {
    this.loading = true;

    const payload = {
      eslip_no : this.eslipValue
    };

    this.reportService.getMyOldReportDeatils(payload).subscribe(
      (response: any) => {

        this.loading = false;
        this.rows =  response;
        this.csvRows = response;
        if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');

        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');

        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');

        } else {}



      }
    );


  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelData.buildExcelReportDetail('Report Detail', rows);

    this.loading = false;

  }

  downloadCsv() {
    this.loading = true;
    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        trans_date: value.trans_date,
        eslip_no: value.eslip_no,
        account_name : value.account_name,
        amount: value.amount,
        trans_id: value.trans_id,
        meter_count: value.meter_count,
        meter_ft: value.meter_ft,
      };

      PushCsv.push(newCsv);
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report_Detail',
      filename: 'Report_Detail',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: [
        'Transaction Date',
        'Eslip No',
        'Account No',
        'Account Name',
        ' Amount',
        'Transaction Id',
        'Meter Ft',
        'Meter Count',

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
      'Transaction Date',
      'Eslip No',
      'Account No',
      'Account Name',
      ' Amount',
      'Transaction Id',
      'Meter Ft',
      'Meter Count',
    ];

    const rows = [];

    /* The following array of object as response from the API req  */

    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        trans_date: value.trans_date,
        eslip_no: value.eslip_no,
        account_name : value.account_name,
        amount: value.amount,
        trans_id: value.trans_id,
        meter_count: value.meter_count,
        meter_ft: value.meter_ft,
      };
      PushCsv.push(newCsv);
    });

    PushCsv.forEach(element => {
      const temp = [
        element.trans_date,
        element.eslip_no,
        element.account_name,
        element.amount,
        element.trans_id,
        element.meter_count,
        element.meter_ft,
      ];

      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Report_Detail.pdf');

    this.loading = false;
  }
  setIndex(ii) {
    this.aa = ii;
  }

  closeView() {
    this.location.back();
  }




}
