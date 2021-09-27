import { Component, OnInit } from '@angular/core';
import { BillerTeamService } from 'src/app/core/services/billers/biller-team/biller-team.service';
import { NzModalService } from 'ng-zorro-antd';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';

@Component({
  selector: 'app-biller-team-members',
  templateUrl: './biller-team-members.component.html',
  styleUrls: ['./biller-team-members.component.scss'],
})
export class BillerTeamMembersComponent implements OnInit {
  rows: any = [];
  loading: boolean;
  code = '';
  searchValue = '';

  constructor(
    private billerTeam: BillerTeamService,
    private excelDownload:ExcelDataService,
    private modal: NzModalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.code = sessionStorage.getItem('comp_code');
    this.getMembers();
  }


  getMembers() {
    // this.loading = true;
    const payload = {
      comp_code: this.code,
    };
    this.billerTeam.getBillerTeamMembers(payload).subscribe((resp: any) => {
      console.log(resp);
      this.loading = false;
      switch (resp.messageCode) {
        case '00':
          this.toastr.warning(resp.message);
          break;

        default:
          this.rows = resp;
          break;
      }
    });
  }
  addTeamMember() {
    const billerTeam = this.modal.create({
      nzTitle: 'Add Team Member',
      nzContent: AddTeamMemberComponent,
      nzWidth: '50%',
      nzFooter: null,
    });
    billerTeam.afterClose.pipe(map(() => {})).subscribe(() => {
      this.getMembers();
    });
  }

  back() {
    this.router.navigate(['admin/billers']);
  }
  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];
    this.excelDownload.billerTeamMember('Biller Team Member.', rows);
    this.loading = false;
  }
}
