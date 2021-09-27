import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';
import { UploadPolicyExcelComponent } from '../policy-columns/upload-policy-excel/upload-policy-excel.component';
import { AddPolicyComponent } from '../add-policy/add-policy.component';
import { ViewPayerPolicyComponent } from '../view-payer-policy/view-payer-policy.component';
import { ExcelDataService } from '../../../../services/excel-data.service';
import { GeneralMappingComponent } from '../policy-columns/general-mapping/general-mapping.component';
import { ToastrService } from 'ngx-toastr';
import { UploadGeneralPolicyComponent } from '../policy-columns/upload-general-policy/upload-general-policy.component';

@Component({
  selector: 'app-set-policies',
  templateUrl: './set-policies.component.html',
  styleUrls: ['./set-policies.component.css']
})
export class SetPoliciesComponent implements OnInit {

  loading = false;
  rows = [];
  myPayers = [];
  searchValue;
  isIndeterminate = false;
  isAllDisplayDataChecked = false;
  selectedRow = [];
  constructor(private policy: PoliciesService,
    private excelDownload: ExcelDataService,
    private modal: NzModalService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getMyPayers();
  }

  getMyPayers() {
    this.loading = true;
    const payload = {};

    this.rows = [];
    this.policy.getMyPayers(payload).subscribe((resp: any) => {
      this.loading = false;
      resp.forEach((value: any) => {
        if (value.status === 'Active') {
          this.myPayers.push(value);
        }
      });
      this.rows = this.myPayers;
    });
  }

  mapPolicy(row) {
    sessionStorage.setItem('policy_payer', row.payer_code);
    this.modal.create({
      nzTitle: 'Set Policy for Payer',
      nzContent: UploadPolicyExcelComponent,
      nzFooter: null,
      nzWidth: '70%',
      nzMaskClosable: false
    });
  }

  addPolicy(row) {
    sessionStorage.setItem('add_policy_to_payer', row.payer_code);
    this.modal.create({
      nzTitle: 'Add Policy to Payer',
      nzContent: AddPolicyComponent,
      nzFooter: null,
      nzWidth: '70%',
      nzMaskClosable: false
    });
  }

  viewPayerPolicy(row) {
    sessionStorage.setItem('view_payer_policy', row.payer_code);
    this.modal.create({
      nzTitle: 'Payer policy',
      nzContent: ViewPayerPolicyComponent,
      nzFooter: null,
      nzWidth: '90%',
      nzMaskClosable: false
    });
  }

  generalMapping() {
    this.modal.create({
      nzTitle: 'General Policy Mapping',
      nzContent: GeneralMappingComponent,
      nzFooter: null,
      nzWidth: '70%',
      nzMaskClosable: false
    });
  }

  uploadGeneralFile(){
    this.modal.create({
      nzTitle: 'Upload General Policies',
      nzContent: UploadGeneralPolicyComponent,
      nzFooter: null,
      nzWidth: '70%',
      nzMaskClosable: false
    });
  }

  updateAllChecked(): void {
    this.isIndeterminate = false;
    if (this.isAllDisplayDataChecked) {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: true
        };
      });
      this.selectedRow = this.rows;

    } else {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: false
        };
      });

      this.selectedRow = this.selectedRow.filter(value => {
        return value.checked == true;
      });

      this.selectedRow = [];


    }
  }

  updateSingleChecked(value) {
    if (value.checked == true) {
      this.selectedRow.push(value);

    } else {
      this.selectedRow = this.selectedRow.filter(value => {
        return value.checked == true;
      });


    }
  }
  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.payerPolicy('Payer Policy', rows);
    this.loading = false;
  }
}
