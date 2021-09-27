import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';

@Component({
  selector: 'app-exception-details',
  templateUrl: './exception-details.component.html',
  styleUrls: ['./exception-details.component.scss']
})
export class ExceptionDetailsComponent implements OnInit {
  payer: string;
  comp_code: string;
  respLength: any;
  rows: any;
  loading: boolean;
  cols: { field: string; header: string }[];
  constructor(
    private location: Location,
    private eslipService: EslipsService,
    private excelData: ExcelDataService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.payer = sessionStorage.getItem('payer');
    this.comp_code = sessionStorage.getItem('comp_code');
    const payload = {
      comp_code: this.comp_code
    };
    this.eslipService.getExceptionLogs(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
      this.respLength = response.length;
    });
    this.cols = [
      { field: 'created_date', header: 'Date Created' },
      { field: 'biller_name', header: 'Biller Name' },
      { field: 'created_by', header: 'Created By' },
      { field: 'description', header: 'Description' },
      { field: 'code', header: 'Code' }
    ];
  }

  back() {
    this.location.back();
  }

  downloadCSV() {
    const rows = [...this.rows];
    this.excelData.buildexceptionList('Exception List', rows);
  }
}
