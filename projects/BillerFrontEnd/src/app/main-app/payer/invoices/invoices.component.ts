import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../service/biller-service/biller.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(public billerService: BillerService) { }

  ngOnInit() {
  }

  handleChange(e) {
    this.billerService.selectedTab = e;
  }

}
