import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from '../../services/excel-data.service';

@Component({
  selector: 'app-paid-eslips',
  templateUrl: './paid-eslips.component.html',
  styleUrls: ['./paid-eslips.component.css']
})
export class PaidEslipsComponent implements OnInit {
  loading = false;
  rows: any;
  searchValue;

  constructor(
    private billerService: BillerService,
    private toastr: ToastrService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.getmyEslips();
  }


  getmyEslips() {
    this.loading = true;

    const pending = [];
    const payload = {};
    this.billerService.getMyEslipsBiller(payload).subscribe((response: any) => {
      if (response[0].messageCode === '00') {
        this.loading = false;
        response.forEach(value => {
          if (value.status === 'Paid') {
            pending.push(value);
          }
        });
        this.rows = pending;
      }
    });
  }

  downloadCSV() {
    const rows = [...this.rows];
    this.excelDownload.buildExcelIpaidEslip('Paid Eslip', rows);
  }
}
