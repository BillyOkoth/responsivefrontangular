import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ExportToCsv } from 'export-to-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report-history-details',
  templateUrl: './report-history-details.component.html',
  styleUrls: ['./report-history-details.component.scss']
})
export class ReportHistoryDetailsComponent implements OnInit {
  rows = [] ;
  csvRows = [];
  searchValue = '';
  historyEslip;
  aa = false;
  loading = false;
  constructor(
    private eslipService: EslipsService,
    public role: RolesService,
    private excelService: ExcelDataService,
  ) { }


  ngOnInit() {
    this.getHistoryDetails();
    this.historyEslip = sessionStorage.getItem('historyEslip');
  }

  getHistoryDetails() {
    this.loading = true ;
    sessionStorage.getItem('historyEslip');
    const payload = {
      eslip_no: sessionStorage.getItem('historyEslip')
    };

    this.eslipService.getMyOldReportDeatils(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;

      }
    );
  }

  setIndex(ii) {
    this.aa = ii;
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelService.buildReportDetails('Detailed Report', rows).then(() => {
      this.loading = false;
    });
  }

  downloadCsv() {
    this.loading = true;
    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        account_name: value.account_name,
        meter_ft : value.meter_ft,
        meter_count: value.meter_count,
        trans_date: value.trans_date,
        trans_id: value.trans_id,
        amount: value.amount,
      };

      PushCsv.push(newCsv);
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report Details',
      filename: 'Report Details',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: [

        'Account Name',
        'Meter FT',
        'Meter Count',
        'Transaction Date',
        'Transaction Id',
        'Amount',

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
      'Account Name',
      'Meter FT',
      'Meter Count',
      'Transaction Date',
      'Transaction Id',
      'Amount',
    ];

    const rows = [];

    /* The following array of object as response from the API req  */

    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        account_name: value.account_name,
        meter_ft : value.meter_ft,
        meter_count: value.meter_count,
        trans_date: value.trans_date,
        trans_id: value.trans_id,
        amount: value.amount,
      };
      PushCsv.push(newCsv);
    });

    PushCsv.forEach(element => {
      const temp = [
        element.account_name,
        element.meter_ft,
        element.meter_count,
        element.trans_date,
        element.trans_id,
        element.amount,

      ];

      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Reports Details.pdf');

    this.loading = false;
  }

}
