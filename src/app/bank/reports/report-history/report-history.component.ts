import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ReportHistoryDetailsComponent } from '../report-history-details/report-history-details.component';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ExportToCsv } from 'export-to-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent implements OnInit {
  rows = [];
  searchValue = '';
  loading = false;
  aa = false;
  csvRows = [];
  constructor(
    private eslipService: EslipsService,
    private router: Router,
    private excelService: ExcelDataService,
    public role: RolesService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.getReportHistory();

  }


  getReportHistory() {
    // sessionStorage.getItem('reports_comp_code')
    const payload = {

      comp_code: sessionStorage.getItem('reports_comp_code')
    };

    this.eslipService.getBankOldReport(payload).subscribe(
      (response: any) => {

        this.rows = response;
      }
    );
  }

  getReportHistoryDetails(data) {
    // modal
    sessionStorage.setItem('historyEslip', data.eslip_no);

    this.modalService.create({
      nzTitle: 'Report History Details',
      nzContent: ReportHistoryDetailsComponent,
      nzWidth: '60%',
      nzFooter: null,
      nzMaskClosable: false
    });
      // this.router.navigate(["/admin/reports-history-details"]);

  }



  setIndex(ii) {
    this.aa = ii;
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelService.buildReportHistory('Report History', rows).then(() => {
      this.loading = false;
    });
  }

  downloadCsv() {
    this.loading = true;
    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        eslip_no: value.eslip_no,
        payref : value.payref,
        amount: value.amount,
        fromdate: value.fromdate,
        todate: value.todate,
        created_at: value.created_at,
      };

      PushCsv.push(newCsv);
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report History',
      filename: 'Report History',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: [

        'Eslip No',
        'Payment Ref',
        'Amount Paid',
        'From',
        'To',
        'Created At',

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
      'Eslip No',
      'Payment Ref',
      'Amount Paid',
      'From',
      'To',
      'Created At',
    ];

    const rows = [];

    /* The following array of object as response from the API req  */

    let newCsv = {};
    const PushCsv = [];

    this.csvRows.forEach(value => {
      newCsv = {
        eslip_no: value.eslip_no,
        payref : value.payref,
        amount: value.amount,
        fromdate: value.fromdate,
        todate: value.todate,
        created_at: value.created_at,
      };
      PushCsv.push(newCsv);
    });

    PushCsv.forEach(element => {
      const temp = [
        element.eslip_no,
        element.payref,
        element.amount,
        element.fromdate,
        element.todate,
        element.created_at,

      ];

      rows.push(temp);
    });

    doc.autoTable(col, rows);
    doc.save('Reports History.pdf');

    this.loading = false;
  }
}
