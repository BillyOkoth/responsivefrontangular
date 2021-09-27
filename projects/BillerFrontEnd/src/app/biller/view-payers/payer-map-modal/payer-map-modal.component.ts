import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../../services/biller-service/biller.service';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { utils, read } from 'xlsx';

@Component({
  selector: 'app-payer-map-modal',
  templateUrl: './payer-map-modal.component.html',
  styleUrls: ['./payer-map-modal.component.css']
})
export class PayerMapModalComponent implements OnInit {
  payerColumns;
  rows;
  table = [];
  loading;
  allPayerMapList: any[];
  location = '';
  customer_code = '';
  customer = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  fname;
  lname;

  // invoice mapping
  mapping;
  upload;
  current = 0;

  constructor(
    private fb: FormBuilder,
    public billerService: BillerService,

  ) {}

  ngOnInit() {
    this.upload = true;
    this.payerColumns = this.fb.group({
      email: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      service: ['', [Validators.required]]
    });
    const payload = {};

    // this.billerService.getMyPayerMapping(payload).subscribe((response: any) => {
    //   this.location = response[0].location;
    //   this.customer_code = response[0].customer_code;
    //   this.email = response[0].email;
    //   this.phone = response[0].phone;
    //   this.address = response[0].address;
    //   this.city = response[0].city;
    //   this.customer = response[0].customer;
    //   this.fname = response[0].fname;
    //   this.lname = response[0].lname;
    // });
  }

  pre(): void {
    this.current -= 1;
    this.upload = true;
    this.mapping = false;
  }

  next(): void {
    this.current += 1;
    this.upload = false;
    this.mapping = true;
  }

  done(): void {
    console.log('done');
  }
}
