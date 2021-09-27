import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from '../../services/excel-data.service';


@Component({
  selector: 'app-pending-eslips',
  templateUrl: './pending-eslips.component.html',
  styleUrls: ['./pending-eslips.component.css']
})
export class PendingEslipsComponent implements OnInit {
  rows: any;
  loading = false ;
  searchValue;
  constructor(
    private billerService: BillerService,
    private toastr: ToastrService,
    private excelDownload:ExcelDataService,
    
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
          if (value.status === 'Pending') {
            pending.push(value);
          }
        });
        this.rows = pending;
      }
    });
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelIpendingEslip('Pending Eslips.', rows);
    this.loading = false;
  }
}
