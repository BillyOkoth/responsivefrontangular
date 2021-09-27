import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-map-invoice',
  templateUrl: './map-invoice.component.html',
  styleUrls: ['./map-invoice.component.css'],
})
export class MapInvoiceComponent implements OnInit {
  columns = [];
  location = '';
  customer_code = '';
  customer = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  loading = false;

  constructor(
    public billerService: BillerService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.columns = this.billerService.columns;
  }

  saveColumns() {
    this.loading = true;

    const payload = {
      location: this.location,
      customer_code: this.customer_code,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      customer: this.customer,
    };
    this.billerService.setMyPayerMapping(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          this.billerService.fetchInvoiceUpdateSubject.next(true);
          this.modalService.closeAll();
          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }
}
