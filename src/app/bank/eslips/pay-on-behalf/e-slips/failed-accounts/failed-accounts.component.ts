import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { Location } from '@angular/common';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-failed-accounts',
  templateUrl: './failed-accounts.component.html',
  styleUrls: ['./failed-accounts.component.scss']
})
export class FailedAccountsComponent implements OnInit {
  loading = false;
  rows = [] ;
  EslipNO;
  AccountsCount;
  searchValue;

  constructor(
    private eslipService: EslipsService,
    private excelDownload: ExcelDataService,
    private location: Location,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.EslipNO = sessionStorage.getItem('failed_no');
    this.getFailedAccounts();


  }


  getFailedAccounts() {
    this.loading = true;

    const payload = {

      eslip_no: sessionStorage.getItem('failed_no')
    };
    this.eslipService.getEslipAccounts(payload).subscribe(
      (response: any) => {

        this.loading = false;
        this.rows = response;
        this.AccountsCount = response.length;

          //  if (response.messageCode === "00"){
          //   this.toastr.warning(response.message,'Warning');

          //  } else if(response.messageCode == "02"){
          //   this.toastr.warning(response.message,'Warning');
          //  }else if(response.messageCode == "06"){
          //   this.toastr.warning(response.message,'Warning');
          //  } else{}
      }
    );

  }


  downloadCSV() {
    this.loading = true;

    const rows = [...this.rows];

    this.excelDownload.buildExcelFailedAccounts('Failed Eslips Accounts', rows);

    this.loading = false;
  }

  closeView() {
    this.location.back();
  }



}
