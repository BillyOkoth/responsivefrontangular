import { Component, OnInit } from '@angular/core';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from '../../../../services/excel-data.service';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.css']
})
export class UploadInvoiceComponent implements OnInit {

  constructor(
    private modalService: NzModalService,
    private toastr: ToastrService,
    private excelData: ExcelDataService,
    private billerService: BillerService
  ) { }
  uploadedFiles: any[] = [];
  selected_file = [];
  file_name;
  fileName: any;
  fileList: any = [];
  roleLists = [];
  loading =  false;
  uploading: boolean;


  public localData = [
    {
      Accountno: '000100000',
      Accountname: 'Stanbic'
    }
  ];

  ngOnInit() {
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


    });
    reader.readAsDataURL(FileEvent);
  }

  uploadInvoices() {
    this.uploading = true;
    this.loading = true;

    const payload = {
      base64Excel : this.fileName,
      file_name: this.file_name
    };


    this.billerService.uploadInvoice(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode === '00') {

          this.billerService.uploadedInvoiceSeSubject.next(true);
          this.toastr.success(response.message, 'Success');
          this.modalService.closeAll();
          this.billerService.selectedInvoiceTab = 1;

        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {}

      }
    );

  }

  downloadSample() {
    this.excelData.multipleIndividualSampleExcel(' Multiple Individual Sample', this.localData);

  }
}
