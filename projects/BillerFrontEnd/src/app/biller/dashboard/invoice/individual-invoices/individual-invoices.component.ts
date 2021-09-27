import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { BillerService } from '../../../../biller/services/biller-service/biller.service';
import { ExcelDataService } from '../../../services/excel-data.service';

@Component({
  selector: 'app-individual-invoices',
  templateUrl: './individual-invoices.component.html',
  styleUrls: ['./individual-invoices.component.css']
})
export class IndividualInvoicesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private billerService: BillerService,
    private excelData: ExcelDataService
  ) {}
  selected_file = [];
  payerForm: FormGroup;
  file_name;

  fileName: any;
  fileList: any = [];
  roleLists = [];
  loading: boolean;
  uploading: boolean;

  public localData = [
    {
      Accountno: '000100000',
      Accountname: 'Stanbic'
    }
  ];

  ngOnInit() {
    this.getMyPayers();
    this.payerForm = this.fb.group({
      payerId: ['', [Validators.required]]
    });
  }

  fileChange(): void {
    // let files = event.target.files;

    // this.selected_file.push(event.target.files[0]);

    this.file_name = this.fileList[0].name;

    const FileEvent = this.fileList[0];
    this.file_name = this.fileList[0].name;
    this.selected_file.push(this.fileList[0]);

    const reader = new FileReader();

    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');

      this.fileName = base64Arry[1];
    });
    reader.readAsDataURL(FileEvent);
  }

  uploadIndividualInvoice() {
    this.loading = true;
    this.uploading = true;

    const formData = this.payerForm.value;
    const payload = {
      base64Excel: this.fileName,
      email: formData.payerId.email,
      payer_code: formData.payerId.payer_code,
      file_name: this.file_name
    };

    this.billerService
      .uploadInvoiceIndividual(payload)
      .subscribe((response: any) => {
        this.loading = false;
        switch (response.messageCode) {
          case '00':
            this.billerService.uploadedInvoiceSeSubject.next(true);
            this.modalService.closeAll();
            this.toastr.success(response.message, 'Success');
            break;

          case '02':
            this.toastr.warning(response.message, 'Warning');
            break;

          case '06':
            this.toastr.warning(response.message, 'Warning');
            break;

          default:
            this.toastr.warning(response.message, 'Warning');
            break;
        }
      });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  getMyPayers() {
    this.loading = true;
    const payload = {};

    this.billerService.getMyPayers(payload).subscribe((resp: any) => {
      this.loading = false;

      resp.forEach((value: any) => {
        if (value.status === 'Active') {
          this.roleLists.push(value);
        }
      });
    });
  }

  downloadSample() {
    this.excelData.singleIndividualSampleExcel(
      ' Single Individual Sample',
      this.localData
    );
  }
}
