import { Component, OnInit } from '@angular/core';
import { ConfirmUploadComponent } from './confirm-upload/confirm-upload.component';
import { UploadFile, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { PoliciesService } from '../../services/policies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-general-policy',
  templateUrl: './upload-general-policy.component.html',
  styleUrls: ['./upload-general-policy.component.css']
})
export class UploadGeneralPolicyComponent implements OnInit {
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

    // sessionStorage.setItem('billerPolicyFileName',this.file_name); 
    // console.log('filename',this.file_name);
    // sessionStorage.setItem('billerPolicySelected',JSON.stringify(this.selected_file)); 



    // this.modalService.create({
    //   nzTitle: 'Confirm  Upload.',
    //   nzContent: ConfirmUploadComponent,
    //   nzWidth: '40vw',
    //   nzFooter: null,
    //   nzMaskClosable: true,
    // });
    reader.readAsDataURL(FileEvent);
  }

  saveMultiple() {
    this.loading = true;
    const payload = {
      // payer_code: sessionStorage.getItem('add_policy_to_payer'),
      base64Excel: this.fileName,
    };

    this.policy.addGeneralMultiplePolicy(payload).subscribe((response: any) => {
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
