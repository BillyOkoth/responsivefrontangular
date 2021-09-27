import { Component, OnInit } from '@angular/core';
import { UploadFile, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { PoliciesService } from '../../services/policies.service';
import { ToastrService } from 'ngx-toastr';
import { PolicyConfirmDialogComponent } from './policy-confirm-dialog/policy-confirm-dialog.component';

@Component({
  selector: 'app-multiple-policy',
  templateUrl: './multiple-policy.component.html',
  styleUrls: ['./multiple-policy.component.css'],
})
export class MultiplePolicyComponent implements OnInit {
  fileList: any = [];
  selected_file = [];
  fileName;
  file_name;
  loading = false;
  constructor(
    private policy: PoliciesService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    private ref: NzModalRef
  ) {}

  ngOnInit() {}

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  fileChange(): void {
    const FileEvent = this.fileList[0];
    this.file_name = this.fileList[0].name;

    this.selected_file.push(this.fileList[0]);

    const reader = new FileReader();

    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];
      sessionStorage.setItem('billerPolicyExcel',this.fileName);

    });

    sessionStorage.setItem('billerPolicyFileName',this.file_name); 
    console.log('filename',this.file_name);
    sessionStorage.setItem('billerPolicySelected',JSON.stringify(this.selected_file)); 



    this.modalService.create({
      nzTitle: 'Confirm  Upload.',
      nzContent: PolicyConfirmDialogComponent,
      nzWidth: '40vW',
      nzFooter: null,
      nzMaskClosable: true,
    });



    reader.readAsDataURL(FileEvent);
  }

  saveMultiple() {
    this.loading = true;
    const payload = {
      payer_code: sessionStorage.getItem('add_policy_to_payer'),
      base64Excel: this.fileName,
    };

    this.policy.addMultiplePolicy(payload).subscribe((response: any) => {
      this.loading = false;
      this.ref.close();
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);

          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }
}
