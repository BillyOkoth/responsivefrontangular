import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller-service/biller.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(public billerService: BillerService) { }

  ngOnInit() {
  }

  handleChange(e) {
    this.billerService.selectedInvoiceTab = e;
  }
}
