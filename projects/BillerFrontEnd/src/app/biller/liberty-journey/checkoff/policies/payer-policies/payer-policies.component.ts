import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';
import { PolicyFileDataComponent } from './policy-file-data/policy-file-data.component';

@Component({
  selector: 'app-payer-policies',
  templateUrl: './payer-policies.component.html',
  styleUrls: ['./payer-policies.component.css'],
})
export class PayerPoliciesComponent implements OnInit {
  rows = [];
  searchValue;
  loading = false;
  constructor(private policy: PoliciesService, private modal: NzModalService) {}

  ngOnInit() {
    this.getPayerPolicy();
  }

  getPayerPolicy() {
    this.loading = true;
    const payload = {};

    this.policy.getPayerPolicies(payload).subscribe((response: any) => {
      this.loading = false;
     if (response.length > 0) {
       this.rows = response;
     }
    });
  }

 viewPolicyFileData(value) {
   sessionStorage.setItem('policy_file', value.file_id);


   this.modal.create({
     nzTitle: `${value.payer_name} Policy File`,
     nzContent: PolicyFileDataComponent,
     nzWidth: '80%',
     nzMaskClosable: false,
     nzFooter: null
   });
 }
}
