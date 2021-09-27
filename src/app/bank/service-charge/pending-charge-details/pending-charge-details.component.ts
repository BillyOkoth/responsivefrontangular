import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending-charge-details',
  templateUrl: './pending-charge-details.component.html',
  styleUrls: ['./pending-charge-details.component.scss']
})
export class PendingChargeDetailsComponent implements OnInit {

  yearSelected;
  monthSelected;
  rows: any[];
  searchValue = '';
  loading = false;
  constructor(
    private eslipService: EslipsService,
    public role: RolesService,
    private excelDownload: ExcelDataService,
    private location: Location
  ) { }

  ngOnInit() {
   this.yearSelected =   sessionStorage.getItem('pendingYearCharge');
   this.monthSelected =   sessionStorage.getItem('pendingMonthCharge');


    const payload = {
      year: this.yearSelected,
      month: this.monthSelected
    };
    this.loading = true;
    this.eslipService.getServiceChargeDetails(payload).subscribe(
      (response: any) => {
        this.loading = false;

        this.rows = response;

      }
    );

  }

  goback() {

    this.location.back();
  }



  downloadExcel() {
    this.loading = true;

    const rows = [...this.rows];
    this.excelDownload.buildDetailsPendingService('Pending Service Charge Details', rows);
    this.loading = false;
  }
}
