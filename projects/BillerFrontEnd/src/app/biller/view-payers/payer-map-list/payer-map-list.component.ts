import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller-service/biller.service';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd';
import { PayerMapModalComponent } from '../payer-map-modal/payer-map-modal.component';

@Component({
  selector: 'app-payer-map-list',
  templateUrl: './payer-map-list.component.html',
  styleUrls: ['./payer-map-list.component.css']
})
export class PayerMapListComponent implements OnInit {
  searchValue = '';
  rows = [];
  loading = false;
  constructor(
    private billerService: BillerService,
    private modalService: NzModalService

  ) { }

  ngOnInit() {
    this.payerMapList();
  }

  payerMapList() {
    this.loading = true;

    const payload = {};

    this.billerService.getMyPayerMapping(payload).subscribe((resp: any) => {
      this.loading = false;

      this.rows = resp;

    });




  }


  editPayerMapList() {

    this.modalService.create({
      nzTitle: 'Payer Mapping',
      nzContent: PayerMapModalComponent,
      nzWidth: '60%',
      nzFooter: null
    });

  }






}
