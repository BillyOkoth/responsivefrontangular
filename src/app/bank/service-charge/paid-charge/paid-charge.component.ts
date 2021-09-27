import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paid-charge',
  templateUrl: './paid-charge.component.html',
  styleUrls: ['./paid-charge.component.scss']
})
export class PaidChargeComponent implements OnInit {
  rows: any[];
  loading: boolean;
  cols: { field: string; header: string }[];
  aa = false;
  searchValue = '';
  month;

  constructor(
    private eslipService: EslipsService,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    public role: RolesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPaidServiceCharge();
    this.cols = [
      { field: 'eslip_no', header: 'Account No' },
      { field: 'bank_ref_no', header: 'Bank Ref' }
    ];
    const paid = [];
    this.loading = true;
    const payload = {};
 
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelPendingCharges('Paid Service Charge Details', rows);
    this.loading = false;
  }

  // downloadExcel() {
  //   this.loading = true;
  //   const rows = [...this.rows];
  //   this.excelDownload.buildExcelPendingCharges('Paid Service Charge', rows);
  //   this.loading = false;
  // }
  setIndex(ii) {
    this.aa = ii;
  }


  getServiceChargeDetails(data) {

    sessionStorage.setItem('paidYearCharge', data.year);
    sessionStorage.setItem('paidMonthCharge', data.month);

    this.router.navigate(['admin/paid-service-charge']);


  }

  getPaidServiceCharge() {
    this.loading = true ;

    const payload = {};

    this.eslipService.getPaidServiceCharge(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;
      }
    );


  }

  getMonth(value) {
    switch (value.month) {
      case '1':
        this.month = 'January';
        break;
      case '2':
        this.month = 'February';
        break;
      case '3':
        this.month = 'March';
        break;
      case '4':
        this.month = 'April';
        break;
      case '5':
        this.month = 'May';
        break;
      case '6':
        this.month = 'June';
        break;
      case '7':
        this.month = 'July';
        break;
      case '8':
        this.month = 'August';
        break;
      case '9':
        this.month = 'September';
        break;
      case '10':
        this.month = 'October';
        break;
      case '11':
        this.month = 'November';
        break;
      case '12':
        this.month = 'December';
        break;
      default:
        break;
    }
    return this.month
  }

}
