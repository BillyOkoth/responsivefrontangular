import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-policy-confirm-dialog',
  templateUrl: './policy-confirm-dialog.component.html',
  styleUrls: ['./policy-confirm-dialog.component.css']
})
export class PolicyConfirmDialogComponent implements OnInit {
  fileList: any = [];
  selected_file = [];
  fileName;
  loading = false;
  testData;
  uploading: boolean;
  selected_Date = '';
  uploadedFiles: any[] = [];
  file_id;
  path;
  file_name;
  roleLists = [];
  insurance_code;
  policy_outliers = [] ;

  constructor(
    private policy: PoliciesService,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private ref: NzModalRef
  ) { }

  ngOnInit(): void {

   this.testData =  sessionStorage.getItem('billerPolicyFileName');

    sessionStorage.getItem('billerPolicyExcel');
    this.selected_file = JSON.parse(sessionStorage.getItem('billerPolicySelected')); 


  }


  saveMultiple() {
    this.loading = true;
    const payload = {
      payer_code: sessionStorage.getItem('add_policy_to_payer'),
      base64Excel: sessionStorage.getItem('billerPolicyExcel')
    };

    this.policy.addMultiplePolicy(payload).subscribe((response: any) => {
      this.loading = false;
      this.ref.close();
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          this.modalService.closeAll();
          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }

  handleCancel(){
    this.modalService.closeAll();
  }
}
