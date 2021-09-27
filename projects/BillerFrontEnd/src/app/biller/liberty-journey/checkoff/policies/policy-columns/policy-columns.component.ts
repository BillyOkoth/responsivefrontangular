import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';
import { UploadPolicyExcelComponent } from './upload-policy-excel/upload-policy-excel.component';

@Component({
  selector: 'app-policy-columns',
  templateUrl: './policy-columns.component.html',
  styleUrls: ['./policy-columns.component.css'],
})
export class PolicyColumnsComponent implements OnInit {
  loading = false;
  rows = [];
  searchValue;

  constructor(private policy: PoliciesService, private modal: NzModalService) {}

  ngOnInit() {
    this.getMappedPolicies();
  }

  getMappedPolicies() {
    this.loading = true;
    const payload = {};
    this.policy.getMappedPolicies(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.rows = response;
      }

    });
  }
  editPolicy() {
    this.modal.create({
      nzTitle: 'Update Policy for Payer',
      nzContent: UploadPolicyExcelComponent,
      nzFooter: null,
      nzWidth: '70%'
    });
  }


}
