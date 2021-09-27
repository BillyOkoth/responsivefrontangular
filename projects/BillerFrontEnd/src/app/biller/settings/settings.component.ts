import { Component, OnInit } from '@angular/core';
import { BillerService } from '../services/biller-service/biller.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  biller;
  constructor(private billerService: BillerService) { }

  ngOnInit() {
    this.biller = sessionStorage.getItem('biller-type').toLowerCase();
  }

  handleChange(e) {
    this.billerService.selectedSetting = e;
  }

}
