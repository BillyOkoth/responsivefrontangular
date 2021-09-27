import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillerService } from '../services/biller-service/biller.service';
import { ExcelDataService } from '../services/excel-data.service';


@Component({
  selector: 'app-service-charge',
  templateUrl: './service-charge.component.html',
  styleUrls: ['./service-charge.component.css']
})
export class ServiceChargeComponent implements OnInit {

  loading = false ;
  rows: any;
  constructor(
    private billerService: BillerService,
    private toastr: ToastrService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    // this.getmyEslips();
  }

  getmyEslips() {
    this.loading = true;

    const pending = [];
    const payload = {};
    this.billerService.getMyEslipsBiller(payload).subscribe((response: any) => {
      if (response[0].messageCode == '00') {
        this.loading = false;

        response.forEach(value => {
          if (value.status.toLowerCase() == 'paid' && value.charge_status.toLowerCase() == 'pending' ) {
            pending.push(value);
          }
        });
        this.rows = pending;
      }
    }),
    (err: any) => {

      this.loading = false ;
    };
  }


  downloadCSV() {
    const rows = [...this.rows];
    this.excelDownload.buildExcelServiceCharge('Service Charge', rows);
  }
}
