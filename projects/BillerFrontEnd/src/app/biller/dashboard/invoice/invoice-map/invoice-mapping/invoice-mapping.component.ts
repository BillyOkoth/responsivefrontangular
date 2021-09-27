import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-invoice-mapping',
  templateUrl: './invoice-mapping.component.html',
  styleUrls: ['./invoice-mapping.component.css'],
})
export class InvoiceMappingComponent implements OnInit {
  invoiceColumns;
  rows;
  data = [];
  loading;
  amount;
  invoice_number;
  service;
  customer_code;
  invoice_date;
  allInvoiceMapList: any[];
  columns = [];

  constructor(
    private fb: FormBuilder,
    public billerService: BillerService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.columns = this.billerService.invoice_columns;


    this.invoiceColumns = this.fb.group({
      amount: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      service: ['', [Validators.required]],
    });

    this.rows = [
      { id: 1, name: 'Email' },
      { id: 2, name: 'Amount' },
      { id: 3, name: 'Due Date' },
      { id: 4, name: 'Service' },
      { id: 5, name: 'Customer Code' },
    ];
    const payload = {};
    this.billerService.getColumns(payload).subscribe((response: any) => {
      if (response.length > 0) {
        this.amount = response[0].amount;
        this.service = response[0].service;
        this.invoice_date = response[0].due_date;
        this.invoice_number = response[0].invoice_no;
        this.customer_code = response[0].customer_code;
      }
    });
  }

  saveColumns() {
    this.loading = true;

    const payload = {
      invoice_no: this.invoice_number,
      due_date: this.invoice_date,
      service: this.service,
      amount: this.amount,
      customer_code: this.customer_code,
    };

    this.billerService.setColumns(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          this.billerService.fetchInvoiceUpdateSubject.next(true);
          setTimeout(() => {
            this.modalService.closeAll();
          }, 2000);
          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }
}
