import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';

@Component({
  selector: 'app-policy-tab',
  templateUrl: './policy-tab.component.html',
  styleUrls: ['./policy-tab.component.css']
})
export class PolicyTabComponent implements OnInit {

  constructor(
    public billerService: BillerService
  ) { }

  ngOnInit() {
  }



  handleChange(e) {
    this.billerService.selectedTab = e;
  }





}
