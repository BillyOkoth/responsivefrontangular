import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';


@Component({
  selector: 'app-payer-upload-tab',
  templateUrl: './payer-upload-tab.component.html',
  styleUrls: ['./payer-upload-tab.component.css']
})
export class PayerUploadTabComponent implements OnInit {

  constructor(
    private billerService: BillerService
  ) { }

  ngOnInit() {
  }

  handleChange(e) {
    this.billerService.selectedTab = e;

  }



}
