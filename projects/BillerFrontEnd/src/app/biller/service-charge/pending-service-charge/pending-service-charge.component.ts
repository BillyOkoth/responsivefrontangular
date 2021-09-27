import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from '../../services/excel-data.service';
import { BillerService } from '../../services/biller-service/biller.service';


@Component({
  selector: 'app-pending-service-charge',
  templateUrl: './pending-service-charge.component.html',
  styleUrls: ['./pending-service-charge.component.css']
})
export class PendingServiceChargeComponent implements OnInit {

  loading = false ;
  rows: any;
  cols = [];
  searchValue = '';
  aa = false;

  constructor(
    private billerService: BillerService,
    private toastr: ToastrService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.getmyEslips();
    this.cols = [
      { field: 'created_at', header: 'First Name' },
      { field: 'eslip_no', header: 'Last Name' },
      { field: 'bank_ref_no', header: 'Company Name' },
      { field: 'status', header: 'Status' },
      { field: 'accounts', header: 'Accounts' },
      { field: 'amount_to_pay', header: 'Amount to Pay' },
      { field: 'amount_charged', header: 'Amount Charged' },
      { field: 'charge_status', header: 'Charge Status' }
    ];

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
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelServiceCharge('Pending Service Charge', rows);
    this.loading = false;
  }

  setIndex(ii) {
    this.aa = ii;

  }

}
