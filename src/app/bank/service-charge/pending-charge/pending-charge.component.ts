import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ConfirmApprovalComponent } from '../confirm-approval/confirm-approval.component';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmServiceChargeApprovalComponent } from '../confirm-service-charge-approval/confirm-service-charge-approval.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pending-charge',
  templateUrl: './pending-charge.component.html',
  styleUrls: ['./pending-charge.component.scss']
})
export class PendingChargeComponent implements OnInit {
  rows: any[];
  loading: boolean;
  month;
  selectedRows: any;
  cols: { field: string; header: string }[];

  isIndeterminate = false;
  // selectedRow:any;
  selectedRow = [];
  isAllDisplayDataChecked = false;
  searchValue = '';
  aa = false;


  constructor(
    private eslipService: EslipsService,
    private excelDownload: ExcelDataService,
    private modalService: NzModalService,
    public role: RolesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.eslipService.fetchPendingCharges.subscribe(value => {
      if (!this.loading) {
        this.getPendingServiceCharge();
      }
    });



  }


  onSelect(value) {

  }

  getPendingServiceCharge() {
    this.loading = true;

    const payload = {};

    this.eslipService.getPendingServiceCharge(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;

      }
    );


  }

  getServiceChargeDetails(data) {

    sessionStorage.setItem('pendingYearCharge', data.year);
    sessionStorage.setItem('pendingMonthCharge', data.month);

    this.router.navigate(['admin/pending-service-charge']);

  }

  updateServiceCharge(data) {
    sessionStorage.setItem('confirmYear', data.year);
    sessionStorage.setItem('confirmMonth', data.month);
    const modal = this.modalService.create({
      nzTitle: 'Confirm Update of Service Charge.',
      nzContent: ConfirmServiceChargeApprovalComponent,
      nzFooter: null,
      nzWidth: '40vw',
      nzMaskClosable: false
    });

    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getPendingServiceCharge()
    });

  }


  downloadExcel() {

    const rows = [...this.rows];
    this.excelDownload.buildExcelPendingCharges('Pending Service Charge', rows);
  }


  approveCharges() {

    const approved = [];

    this.selectedRow.forEach(element => {
      const eslip_no = { eslip_no: element.eslip_no };
      approved.push(eslip_no);
    });
    this.eslipService.pendingCharges = approved;

    this.modalService.create({
      nzTitle: 'Confirm Approval',
      nzContent: ConfirmApprovalComponent,
      nzWidth: '70vw',
      nzFooter: null
    });


    // const dialogRef = this.dialog.open(ConfirmApprovalComponent, {
    //   width: '70vw'
    // });
  }

  updateAllChecked(): void {
    this.isIndeterminate = false;
    if (this.isAllDisplayDataChecked) {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: true
        };
      });
      this.selectedRow = this.rows;
    } else {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.selectedRow = this.selectedRow.filter(value => {
        return value.checked === true;
      });
    }


  }

  updateSingleChecked(value) {

    if (value.checked === true) {
      this.selectedRow.push(value);
    } else {
      this.selectedRow = this.selectedRow.filter(value => {
        return value.checked === true;
      });
    }


  }
  setIndex(ii) {
    this.aa = ii;
  }

  pendingCharges() {
    this.cols = [
      { field: 'eslip_no', header: 'Account No' },
      { field: 'bank_ref_no', header: 'Bank Ref' }
    ];
    const paid = [];
    this.loading = true;
    const payload = {};
    this.eslipService.fetchEslips(payload).subscribe((response: any) => {
      if (response[0].messageCode === '00') {
        this.loading = false;
        response.forEach(value => {
          if (
            value.status.toLowerCase() === 'paid' &&
            value.charge_status.toLowerCase() === 'pending'
          ) {
            paid.push(value);
          }
        });
        this.rows = paid;
      }
    });
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
