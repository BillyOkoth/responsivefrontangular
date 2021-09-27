import { Component, OnInit } from '@angular/core';
import { BillerService } from '../services/biller-service/biller.service';
import { NzModalService } from 'ng-zorro-antd';
import { CommissionSettingsComponent } from '../commission-settings/commission-settings.component';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
  searchValue = '';
  rows = [];
  loading;
  constructor(
    private billerService: BillerService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.billerService.fetchCommissionsUpdateSubject.subscribe(
      value => {
        this.getCommission();
      }
    );

  }

  resetCommisions() {
    this.modalService.create({
      nzTitle: 'Set Up Commisions',
      nzContent: CommissionSettingsComponent,
      nzWidth: '60%',
      nzFooter: null
    });
  }


  getCommission() {
    const payload = {};
    this.billerService.getCommission(payload).subscribe((response: any) => {
    if (response.length > 0) {
      this.rows = response;
    }
    });

  }
}
