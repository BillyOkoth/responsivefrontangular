import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';
import { UpdatePolicyComponent } from './update-policy/update-policy.component';
import { map } from 'rxjs/operators';
import { ExcelDataService } from '../../../../services/excel-data.service';

@Component({
  selector: 'app-view-payer-policy',
  templateUrl: './view-payer-policy.component.html',
  styleUrls: ['./view-payer-policy.component.css'],
})
export class ViewPayerPolicyComponent implements OnInit {
  rows = [];
  searchValue;
  loading = false;

  constructor(private policy: PoliciesService,
    private excelDownload: ExcelDataService,
     private modal: NzModalService) {}

  ngOnInit() {
    this.getPayerPolicy();
  }

  getPayerPolicy() {
    this.loading = true;
    const payload = {
      payer_code: sessionStorage.getItem('view_payer_policy'),
    };
    this.policy.viewPayerPolicy(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.rows = response;
      }
    });
  }

  editPolicy(row) {
    sessionStorage.setItem('row_edited', JSON.stringify(row));
    const modal = this.modal.create({
      nzTitle: 'Edit Policy',
      nzContent: UpdatePolicyComponent,
      nzWidth: '60%',
      nzFooter: null,
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => {})).subscribe(() => {
      this.getPayerPolicy();
    });
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.viewPayerPolicy('View Payer Policy.', rows);
    this.loading = false;
  }


}
