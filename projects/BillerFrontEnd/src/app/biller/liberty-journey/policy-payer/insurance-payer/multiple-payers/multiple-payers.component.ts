import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { MenuService } from '../../../../services/menu-service/menu.service';
import { ToastrService } from 'ngx-toastr';
import { read, utils } from 'xlsx';
import { MultiplePayerConfirmDialogComponent } from './multiple-payer-confirm-dialog/multiple-payer-confirm-dialog.component';

@Component({
  selector: 'app-multiple-payers',
  templateUrl: './multiple-payers.component.html',
  styleUrls: ['./multiple-payers.component.css']
})
export class MultiplePayersComponent implements OnInit {
  uploadedFiles: any[] = [];
  selected_file = [];
  file_name;
  fileName: any;
  fileList: any = [];
  roleLists = [];
  loading: boolean;
  uploading: boolean;
  multipleForm: FormGroup;
  data = [];
policyTypes = [];


  constructor(
    private fb: FormBuilder,
    private billerService: BillerService,
    private modalService: NzModalService,
    private menuService: MenuService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getDeps();
    this.multipleForm = this.fb.group({
      departmentId: ['', [Validators.required]],
      policy_type: ['', Validators.required]
    });
    this.policyTypes = [
      {name: 'Checkoff', value: 'checkoff'},
      {name: 'Umbrella', value: 'umbrella'}
    ];
  }

  uploadPayers() {
    this.loading = true;
    this.uploading = true;

    const formData = this.multipleForm.value;

    const payload = {
      base64Excel: this.fileName,
      billing_id: formData.departmentId.id,
      policy_type: formData.policy_type.value
    };

    this.billerService.uploadPayerFile(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.billerService.fetchInvitedSubject.next(true);
          this.modalService.closeAll();
          this.toastr.success(response.message, 'Success');
          break;
        case '01':
          this.toastr.warning(response.message, 'Warning');
          break;

        case '02':
          this.toastr.warning(response.message, 'Warning');
          break;

        case '03':
          this.toastr.warning(response.message, 'Warning');
          break;

        default:
          this.toastr.warning(response.message, 'Warning');
          break;
      }
    });
  }

  getDeps() {
    this.loading = true;
    const payload = {};

    this.menuService.getDepartments(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.roleLists = response;
      }
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  fileChange(): void {
    this.file_name = this.fileList[0].name;

    const FileEvent = this.fileList[0];
    this.file_name = this.fileList[0].name;
    this.selected_file.push(this.fileList[0]);

    const reader = new FileReader();

    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];
      sessionStorage.setItem('multipleExcel',this.fileName);
   
    });
    const formData = this.multipleForm.value;
   
    sessionStorage.setItem('multipleBillingId',formData.departmentId.id);
  
    sessionStorage.setItem('multiplePolicyType',formData.policy_type.value);
    sessionStorage.setItem('multiplePayersName',this.file_name);
    sessionStorage.setItem('multipleSelectedFile',JSON.stringify(this.selected_file)); 

    this.modalService.create({
      nzTitle: 'Confirm  Upload.',
      nzContent: MultiplePayerConfirmDialogComponent,
      nzWidth: '40vW',
      nzFooter: null,
      nzMaskClosable: true,
    });
    

    reader.readAsDataURL(FileEvent);
    this.getExcelRows();
  }

  getExcelRows() {
    let row;
    const json = [];
    const reader = new FileReader();
    reader.onload = ((x: any) => {
      const data = x.target.result;
      const workbook = read(data, { type: 'binary' });
      workbook.SheetNames.forEach(sheetname => {
        row = utils.sheet_to_json(workbook.Sheets[sheetname]);
        json.push(row);
      });
      this.getJson(json[0]);
    });

    reader.onerror = ((x)  => {
      console.error('File could not be read! Code ');
    });

    reader.readAsBinaryString(this.fileList[0]);
  }

  getJson(value) {
    this.data = value;
    const sample = this.data[0];
    const headers = Object.keys(sample);
    headers.forEach(header => {
      const index = headers.findIndex(value => value === header) + 1;
    
    });

  }
}
