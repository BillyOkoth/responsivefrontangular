import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { Router } from '@angular/router';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.scss']
})
export class ExceptionsComponent implements OnInit {
  rows: any;
  cols: { field: string; header: string }[];
  loading: boolean;
  allRights;
  exceptionRights;
  constructor(
    private eslipService: EslipsService,

    private router: Router,
    private excelData: ExcelDataService,

    public role: RolesService
  ) {}

  ngOnInit() {
    this.eslipService.fetchExceptions.subscribe(value => {
      this.getExceptions();
    });

    this.cols = [{ field: 'payer_name', header: 'Payer Name' }];
  }


  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName === 'Exceptions') {
        this.exceptionRights = element.roles;
      }
    });

    if (this.exceptionRights.length > 0) {
      this.exceptionRights.forEach(value => {
        if (value.role === 'all') {
          this.role.exceptionRole = value.status;
        }
      });
    } else {
      this.role.exceptionRole = true;
    }


  }
  viewDetails(value) {
    sessionStorage.setItem('payer', value.payer_name);
    sessionStorage.setItem('comp_code', value.comp_code);
    this.router.navigate(['admin/exception-details']);
  }
  downloadCSV() {
    const rows = [...this.rows];
    this.excelData.buildexceptionOwners('Exception Owners', rows);
  }

  reconciliationFn(value) {
    sessionStorage.setItem('datecreated', value.created_at);
    sessionStorage.setItem('valueamount', value.amount);
    sessionStorage.setItem('reference', value.reference);
    sessionStorage.setItem('ft', value.ft);
    sessionStorage.setItem('eslipNO', value.eslip_no);
    sessionStorage.setItem('ID', value.id);
  }

  getExceptions() {
    this.loading = true;
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe(response => {
      this.loading = false;
      this.rows = response;
    });
  }
}
