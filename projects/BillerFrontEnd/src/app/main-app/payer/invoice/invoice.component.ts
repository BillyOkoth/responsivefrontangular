import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../../service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AliasService } from '../../../service/alias.service';
import { BillerIdService } from '../../../service/billerId.service';
import { NotifyService } from '../../../service/notify.service';
import { InvoiceService } from '../../../service/invoice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BillerTypeService } from '../../../service/billerType.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  loading = false;
  invoices: any[] = [];
  file_id = '';
  invoice = '';
  service = '';
  amount = '';
  commission = '';
  tax = '';
  status = '';
  biller_code = '';
  payer_code = '';
  due_date = '';
  payer_name = '';
  service_id = '';
  service_name = '';
  payername = '';
  billername = '';
  biller_email = '';
  biller_phone = '';
  payer_phone = '';
  account_no = '';
  account_name = '';
  alias = '';
  website = '';
  customercare = '';
  paybill = '';
  notif_value = '';
  base64 = '';
  biller_color = '#FF4136';
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  teamMenu = [];
  adminMenu = [];
  allowedMenus = [];
  fileName = '';
  biller = '';
  newBiller = '';
  token = '';
  grand_total = 0;
  biller_class = '';

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private aliasService: AliasService,
    private billerIdService: BillerIdService,
    private bilerClassService: BillerTypeService,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private invoiceService: InvoiceService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params.token;
      this.getInvoiceInfo();
    });
  }

  getInvoiceInfo() {
    this.invoiceService
      .getInvoiceInfo({ token: this.token })
      .subscribe((response: any) => {
        const prefix = 'data:image/png;base64,';
        this.invoices = response;
        response.forEach((item) => {
          this.grand_total = this.grand_total + +item.amount;
        });
        this.invoice = response[0].invoice;
        this.base64 = `${prefix}${response[0].base64}`;
        console.log(this.base64);
        this.due_date = response[0].due_date;
        this.file_id = response[0].file_id;
        this.biller_color = response[0].color;
        document.documentElement.style.setProperty('--biller-color', this.biller_color);
        this.notif_value = response[0].notif_value;
        this.service = response[0].service;
        this.amount = response[0].amount;
        this.commission = response[0].commission;
        this.tax = response[0].tax;
        this.status = response[0].status;
        this.biller_code = response[0].biller_code;
        this.payer_code = response[0].payer_code;
        this.due_date = response[0].due_date;
        this.payer_name = response[0].payer_name;
        this.service_id = response[0].service_id;
        this.service_name = response[0].service_name;
        this.payername = response[0].payername;
        this.billername = response[0].billername;
        this.biller_email = response[0].biller_email;
        this.biller_phone = response[0].biller_phone;
        this.payer_phone = response[0].payer_phone;
        this.account_no = response[0].account_no;
        this.account_name = response[0].account_name;
        this.alias = response[0].alias;
        this.biller_class = response[0].closed_biller_type;
        this.website = response[0].website;
        this.customercare = response[0].customercare;
        this.paybill = response[0].paybill;
      });
  }

  payInvoice() {}

  generateEslip() {}

  testClick() {
    return this.router.navigate(['/']);
  }

  setBiller() {
    this.billerIdService.setBillerId(this.biller_code);
    this.notifyService.setNotify(this.notif_value);
    this.aliasService.setAlias(this.alias);
    this.bilerClassService.setClosedBillerClass(this.biller_class);
    return this.router.navigate(['/']);
  }
}
