import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
  AfterViewInit
} from '@angular/core';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { EslipAc } from 'projects/BillerFrontEnd/src/app/service/login.model';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { GeneratedESlipComponent } from '../generated-e-slip.component';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-eslips',
  templateUrl: './pending-eslips.component.html',
  styleUrls: ['./pending-eslips.component.css']
})
export class PendingEslipsComponent implements OnInit {


  // @ViewChild(GeneratedESlipComponent, { static: false })
  viewChild: GeneratedESlipComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;

  loading;
  aa = false;
  searchValue = '';
  pendingEslips = [];
  billerInsuranceFlag;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private excelDownload: ExcelDataService,
    private myaccountsService: MyAccountsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.billerInsuranceFlag =  sessionStorage.getItem('biller_code');
    this.rows = [];
    // this.getMyEslips();

    this.myaccountsService.fetchEslipSubject.subscribe(value => {
      if (!this.loading) {
        // prevent more than one request at a time ..
        this.getMyEslips();
      }
    });
  }

  getMyEslips() {
    this.loading = true;
    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };

    this.rows = [];
    this.pendingEslips = [];

    this.loginService.getMyEslips(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach((value: any) => {
        if (value.status === 'Pending') {
          this.pendingEslips.push(value);
        }
      });
     this.rows = this.pendingEslips;
    }, (err: any) => {

    });
  }

  onActivate() {}
  onSelect() {}



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

  downloadExcel() {
    this.loading =  true;
    const rows = [...this.rows];
    this.excelDownload.buildExcelIpendingEslip('Pending Eslips', rows);
    this.loading =  false;
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
      saveAs(blob, 'Eslip.pdf');
    },
    (err: any) => {

       });
  }

  setIndex(ii) {
    this.aa = ii;

  }


}
