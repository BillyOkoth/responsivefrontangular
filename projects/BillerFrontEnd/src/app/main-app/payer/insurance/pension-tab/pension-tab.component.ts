import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';

@Component({
  selector: 'app-pension-tab',
  templateUrl: './pension-tab.component.html',
  styleUrls: ['./pension-tab.component.css']
})
export class PensionTabComponent implements OnInit {

  constructor(

    public billerService: BillerService
  ) { }

  ngOnInit() {
  }

  handleChange(e) {
    this.billerService.selectedTab = e;
  }


}
