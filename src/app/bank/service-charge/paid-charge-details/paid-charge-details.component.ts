import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-paid-charge-details',
  templateUrl: './paid-charge-details.component.html',
  styleUrls: ['./paid-charge-details.component.scss']
})
export class PaidChargeDetailsComponent implements OnInit {

  yearSelected;
  monthSelected;
  loading = false;
  rows: any[];
  searchValue = '';
  constructor(
    private eslipService: EslipsService,
    public role: RolesService,
    private location: Location,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
   this.yearSelected  =   sessionStorage.getItem('paidYearCharge');
   this.monthSelected  =   sessionStorage.getItem('paidMonthCharge');

    const payload = {

      year: this.yearSelected,
      month: this.monthSelected
    };

    const pending = [];

    this.eslipService.getServiceChargeDetails(payload).subscribe(
      (response: any) => {

        this.rows = response ;


      }
    );

  }

  goback() {

    this.location.back();
  }

  downloadExcel() {
    this.loading = true;

    const rows = [...this.rows];
    this.excelDownload.buildDetailsPendingService('Paid Service Charge Details', rows);
    this.loading = false;

  }

}
