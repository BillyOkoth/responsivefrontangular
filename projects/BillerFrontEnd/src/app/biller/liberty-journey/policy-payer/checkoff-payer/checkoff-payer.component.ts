import { Component, OnInit } from '@angular/core';
import { DeletePayerModalComponent } from '../../../view-payers/payers/my-payers/delete-payer-modal/delete-payer-modal.component';
import { BillerService } from '../../../services/biller-service/biller.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PayerMapModalComponent } from '../../../view-payers/payer-map-modal/payer-map-modal.component';
import { ExcelDataService } from '../../../services/excel-data.service';
import { InsurancePayerComponent } from '../insurance-payer/insurance-payer.component';
import { EditPayerComponent } from '../edit-payer/edit-payer.component';

@Component({
  selector: 'app-checkoff-payer',
  templateUrl: './checkoff-payer.component.html',
  styleUrls: ['./checkoff-payer.component.css']
})
export class CheckoffPayerComponent implements OnInit {
  rows = [];
  myPayers = [];
  cols = [];
  aa = false;
  searchValue = '';
  loading = false;
  checkoff = [];

  constructor(private billerService: BillerService,
    private modalService: NzModalService,
    private router: Router,
    private toastr: ToastrService,
    private excelDownload: ExcelDataService) { }

  ngOnInit() {
    this.billerService.payerSubject.subscribe(
      value => {
        this.getMyPayers();
      }
    );
  }

  getMyPayers() {
    this.loading = true;
    const payload = {};

    this.rows = [];
    this.billerService.getMyPayers(payload).subscribe((resp: any) => {
      this.loading = false;

      resp.forEach((value: any) => {
        if (value.status === 'Active') {
          this.myPayers.push(value);
        }
      });
      // this.rows = this.myPayers;
      this.myPayers.forEach((value: any) => {
        value.policy_type.forEach((policy: any) => {
          // console.log(policy);
          if (policy.type.toLowerCase() === 'checkoff') {
            this.checkoff.push(value);
          }
        });
      });
      // console.log(this.checkoff);
      this.rows = this.checkoff
    });
  }

  viewMore(row) {
    sessionStorage.setItem('payerCode', row.payer_code);
    this.router.navigate(['biller/payer-profile']);
  }

  setIndex(ii) {
    this.aa = ii;
  }

  payerMapModal() {
    this.modalService.create({
      nzTitle: 'Set Payer Columns',
      nzContent: PayerMapModalComponent,
      nzWidth: '80%',
      nzFooter: null
    });
  }
  uploadPayer() {
    this.modalService.create({
      nzTitle: 'Create Payer',
      nzContent: InsurancePayerComponent,
      nzWidth: '80vw',
      nzFooter: null
    });
  }

  resendInvite(data) {
    this.loading = true;

    const payload = {
      email: data.email
    };

    this.billerService.resendInvitation(payload).subscribe(
      (response: any) => {
        this.loading = false;

        switch (response.messageCode) {
          case '00':
            this.toastr.success(response.message, 'Success');
            break;
          default:
            this.toastr.warning(response.message, 'Warning');


        }
      }
    );

  }


  downloadCSV() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.payersExcel('Payers', rows);
    this.loading = false;

  }

  deletePayer(data) {

    sessionStorage.setItem('deletePayerCode', data.payer_code);
    sessionStorage.setItem('deletePayerName', data.company_name);

    this.modalService.create({
      nzTitle: 'Delete Payer',
      nzContent: DeletePayerModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

  editPayer(value) {

    sessionStorage.setItem('edit_payer', JSON.stringify(value));
    this.modalService.create({
      nzTitle: 'Edit Payer',
      nzContent: EditPayerComponent,
      nzFooter: null,
      nzWidth: '60%',
      nzMaskClosable: false
    });
  }
}
