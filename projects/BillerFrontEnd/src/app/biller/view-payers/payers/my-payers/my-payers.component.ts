import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { CreatingPayerComponent } from '../../creating-payer/creating-payer.component';
import { PayerMapModalComponent } from '../../payer-map-modal/payer-map-modal.component';
import { ExcelDataService } from '../../../services/excel-data.service';
import { DeletePayerModalComponent } from './delete-payer-modal/delete-payer-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AssignTeamComponent } from '../../assign-team/assign-team.component';
import { EditPayerComponent } from '../../../liberty-journey/policy-payer/edit-payer/edit-payer.component';



@Component({
  selector: 'app-my-payers',
  templateUrl: './my-payers.component.html',
  styleUrls: ['./my-payers.component.css']
})
export class MyPayersComponent implements OnInit {
  rows = [];
  myPayers = [];
  cols = [];
  aa = false;
  searchValue = '';
  loading = false;
  constructor(
    private billerService: BillerService,
    private modalService: NzModalService,
    private router: Router,
    private toastr: ToastrService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {

    this.billerService.payerSubject.subscribe(
      value => {
        this.getMyPayers();
      }
    );

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'company_name', header: 'Company Name' },
      { field: 'status', header: 'Status' },
      { field: 'accounts', header: 'Accounts' }
    ];
  }

  getMyPayers() {
    this.loading = true;
    const payload = {};

    this.rows = [];
    this.billerService.getMyPayers(payload).subscribe((resp: any) => {
      this.loading = false;

      if (resp.length > 0) {
        resp.forEach((value: any) => {
          if (value.status === 'Active') {
            this.myPayers.push(value);
          }
        });
        this.rows = this.myPayers;
      }
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
      nzFooter: null,
      nzMaskClosable: false
    });
  }
  uploadPayer() {
    this.modalService.create({
      nzTitle: 'Create Payer',
      nzContent: CreatingPayerComponent,
      nzWidth: '80vw',
      nzFooter: null,
      nzMaskClosable: false
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
      nzWidth: '50%',
      nzMaskClosable: false
    });


  }

  assignPayertoTeam(value) {
    sessionStorage.setItem('team_payer_code', value.payer_code);
    this.modalService.create({
      nzTitle: 'Add Payer to Team',
      nzContent: AssignTeamComponent,
      nzWidth: '50%',
      nzFooter: null,
      nzMaskClosable: false
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
