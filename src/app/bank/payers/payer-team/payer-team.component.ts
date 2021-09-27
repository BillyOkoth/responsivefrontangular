import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillerTeamService } from 'src/app/core/services/billers/biller-team/biller-team.service';
import { PayerMemberComponent } from './payer-member/payer-member.component';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
@Component({
  selector: 'app-payer-team',
  templateUrl: './payer-team.component.html',
  styleUrls: ['./payer-team.component.scss'],
})
export class PayerTeamComponent implements OnInit {
  rows: any = [];
  loading = false;
  code = '';
  searchValue = '';
  constructor(
    private modal: NzModalService,
    private excelDownload:ExcelDataService,
    private toastr: ToastrService,
    private payerTeam: BillerTeamService,
    private router: Router,
    private dialogRef: NzModalRef
  ) {}

  ngOnInit() {
    this.code = sessionStorage.getItem('comp_code');
    this.getMembers();
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.payerTeamMember('Payer Team Member.', rows);
    this.loading = false;
  }

  getMembers() {
    this.loading = true;

    const payload = {
      comp_code: this.code,
    };
    this.payerTeam.getBillerTeamMembers(payload).subscribe((resp: any) => {
      this.loading = false;
      this.rows = resp;
    });
  }

  fetchTeam() {
    this.getMembers();
  }
  addTeamMember() {
    const modal = this.modal.create({
      nzTitle: 'Add Team Member',
      nzContent: PayerMemberComponent,
      nzWidth: '50%',
      nzFooter: null,
    });
    modal.afterClose.pipe(map(() => {})).subscribe(() => {
      this.getMembers();
    });
  }

  back() {
    this.router.navigate(['admin/payers']);
  }


  
}
