import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { NzModalService } from 'ng-zorro-antd';
import { InvoiceMappingComponent } from '../invoice-map/invoice-mapping/invoice-mapping.component';
@Component({
  selector: 'app-invoice-map-list',
  templateUrl: './invoice-map-list.component.html',
  styleUrls: ['./invoice-map-list.component.css']
})
export class InvoiceMapListComponent implements OnInit {
  searchValue = '';
  rows = [];
  loading = false;
  constructor(
    private billerService: BillerService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.getInvoiceList();
  }

  getInvoiceList() {
    this.loading = true;

    const payload = {};
    this.billerService.getColumns(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
    });
  }

  editInvoiceMap() {
    this.modalService.create({
      nzTitle: 'Invoice Columns',
      nzContent: InvoiceMappingComponent,
      nzWidth: '60%',
      nzFooter: null
    });
  }
}
