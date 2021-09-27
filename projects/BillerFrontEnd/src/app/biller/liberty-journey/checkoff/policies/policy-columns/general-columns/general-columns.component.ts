import { Component, OnInit } from '@angular/core';
import { GeneralMappingComponent } from '../general-mapping/general-mapping.component';
import { PoliciesService } from '../../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-general-columns',
  templateUrl: './general-columns.component.html',
  styleUrls: ['./general-columns.component.css']
})
export class GeneralColumnsComponent implements OnInit {
  loading = false;
  rows = [];
  searchValue;

  constructor(private policy: PoliciesService, private modal: NzModalService) { }

  ngOnInit() {
    this.getMappedPolicies();
  }

  getMappedPolicies() {
    this.loading = true;
    const payload = {};
    this.policy.getGeneralMappedPolicies(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.rows = response;
      }

    });
  }
  editPolicy() {
    this.modal.create({
      nzTitle: 'Update General Policy',
      nzContent: GeneralMappingComponent,
      nzFooter: null,
      nzWidth: '70%'
    });
  }

}
