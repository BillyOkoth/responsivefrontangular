import { Component, OnInit } from '@angular/core';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';
import { EslipAc } from 'projects/BillerFrontEnd/src/app/service/login.model';

@Component({
  selector: 'app-expired-eslips',
  templateUrl: './expired-eslips.component.html',
  styleUrls: ['./expired-eslips.component.css']
})
export class ExpiredEslipsComponent implements OnInit {

  editing = {};
  billerInsuranceFlag;
  rows = [];
  aa = false;
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  searchValue = '';

  loading;
  paidEslips = [];
  listOfSearchName: string[] = [];
  listOfSearchAddress: string[] = [];
  listOfFilterName = [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }];
  listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfData: any[] = [];
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: string | null } = {
    name: null,
    age: null,
    address: null
  };
  sortName: string | null = null;
  sortValue: string | null = null;

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  search(listOfSearchName: string[], listOfSearchAddress: string[]): void {
    this.listOfSearchName = listOfSearchName;
    this.listOfSearchAddress = listOfSearchAddress;
    const filterFunc = (item: any) =>
      (this.listOfSearchAddress.length
        ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
        : true) &&
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const listOfData = this.listOfData.filter((item: any) => filterFunc(item));
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.listOfDisplayData = listOfData;
    }
  }

  resetFilters(): void {
    this.listOfFilterName = [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }];
    this.listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
    this.listOfSearchName = [];
    this.listOfSearchAddress = [];
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  resetSortAndFilters(): void {
    this.sortName = null;
    this.sortValue = null;
    this.mapOfSort = {
      name: null,
      age: null,
      address: null
    };
    this.resetFilters();
    this.search(this.listOfSearchName, this.listOfSearchAddress);
  }

  constructor(private loginService: LoginService,
     private router: Router,
     private toastr: ToastrService,
     private excelDownload: ExcelDataService,
     private myaccountsService: MyAccountsService) {}

  ngOnInit() {
    this.billerInsuranceFlag =  sessionStorage.getItem('biller_code');
    this.getMyEslips();
  }

  getMyEslips() {
    this.loading = true;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };
    this.loginService.getMyEslips(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach(value => {
        if (value.status.toLowerCase() === 'expired') {
          this.paidEslips.push(value);
        }
      });

      this.rows = this.paidEslips;
    }, (err: any) => {

    });
  }

  onActivate() {}
  onSelect() {}

  viewEslip(slipNo: string) {
    // set selected e slip then display for download
    sessionStorage.setItem('slip_no', slipNo);
    const payload = {
      eslip_no: slipNo
    };

    this.loginService.getEslipInfo(payload).subscribe((response: any) => {

    }, (err: any) => {

    });
    this.router.navigate(['/app/dashboard/eslip-receipt']);
  }



  viewEslipAc(slipNos: string) {
    sessionStorage.setItem('slip_nos', slipNos);

    const payload: EslipAc = {
      eslip_no: slipNos
    };

    this.loginService
      .getEslipAccounts(payload)
      .subscribe((response: any) => {});
    this.router.navigate(['/app/dashboard/account-eslips']);
  }

  downloadEslip(value) {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: value
    };

    this.myaccountsService.downloadEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

      const blob = new Blob([response], { type: mediaType });
      saveAs(blob, 'Paid Eslip.pdf');
    },
    (err: any) => {

       });
  }

  downloadCSV() {
    this.loading =  true;
    const rows = [...this.rows];

    this.excelDownload.buildExcelIpaidEslip('Paid Eslips', rows);
    this.loading =  false;
  }

  setIndex(ii) {
    this.aa = ii;

  }

}
