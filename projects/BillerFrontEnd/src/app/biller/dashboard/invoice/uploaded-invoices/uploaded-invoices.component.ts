import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { UploadInvoiceComponent } from '../upload-tab/upload-invoice/upload-invoice.component';
import { Router } from '@angular/router';
import { BillerService } from '../../../services/biller-service/biller.service';
import { UploadTabComponent } from '../upload-tab/upload-tab.component';
import { InvoiceMappingComponent } from '../invoice-map/invoice-mapping/invoice-mapping.component';
import { InvoiceMapComponent } from '../invoice-map/invoice-map/invoice-map.component';

@Component({
  selector: 'app-uploaded-invoices',
  templateUrl: './uploaded-invoices.component.html',
  styleUrls: ['./uploaded-invoices.component.css']
})
export class UploadedInvoicesComponent implements OnInit {
  loading = false;
  rows = [];
  searchValue = '';
  constructor(
    private modalService: NzModalService,
    private router: Router,
    private billerService: BillerService
  ) {}

  ngOnInit() {
    this.getUploadedInvoiceFiles();
  }

  mapInvoice() {
    this.modalService.create({
      nzTitle: 'Invoice Columns',
      nzContent: InvoiceMapComponent,
      nzWidth: '50%',
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  getUploadedInvoiceFiles() {
    this.loading = true;
    const payload = {};

    this.billerService
      .getUploadedInvoiceFiles(payload)
      .subscribe((response: any) => {
        this.loading = false;
        this.rows = response;
      });
  }

  uploadInvoiceExcel() {
    this.modalService.create({
      nzTitle: 'Upload Invoice',
      nzContent: UploadTabComponent,
      nzWidth: '80%',
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  viewUploadedFileDetails(data: any) {
    sessionStorage.setItem('fileId', data.file_id);
    this.router.navigate(['/biller/dashboard/invoice-details']);
  }
}
