import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillerService } from '../../../service/biller-service/biller.service';
import { NzModalService } from 'ng-zorro-antd';
import { InsurancePayerMapComponent } from './insurance-payer-map/insurance-payer-map.component';
import { PayerUploadTabComponent } from './payer-upload-tab/payer-upload-tab.component';
import { UmbrellaFundPolicyComponent } from './umbrella-fund-policy/umbrella-fund-policy.component';
import { PayerInsuranceMappingComponent } from './payer-insurance-mapping/payer-insurance-mapping.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  loading = false;
  insurance_code;
  rows = [];
  outInvoice = [];
  aa = false;
  searchValue;
  constructor(

    private billerService: BillerService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.insurance_code = sessionStorage.getItem('biller_code');

    this.billerService.payerPolicyUpdateSubject.subscribe(
      value => {
        this.payerGetPolicyMapping();
      }
    );

  }


  payerGetPolicyMapping() {

    this.loading = true;
    const payload = {
      biller_code: this.insurance_code,
    };
    this.rows = [];
    this.outInvoice = [];

    this.billerService.payerGetPolicyMapping(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;
        // response.forEach((value: any) => {
        
        //   if (value.status.toLowerCase() === 'pending') {

        //     this.outInvoice.push(value);
        //   }

        // });
        // this.rows = this.outInvoice;
      }
    );
  }

  mapPayerInvoice() {
    this.modalService.create({
      nzTitle: 'Payer Policy Columns',
      nzContent: InsurancePayerMapComponent,
      nzWidth: '80vw',
      nzFooter: null
    });

  }


  uploadPayerPolicyExcel() {

    this.modalService.create({
      nzTitle: 'Upload Policies.',
      nzContent: PayerUploadTabComponent,
      nzWidth: '80vw',
      nzFooter: null
    });

  }

  updateFileMapping() {
    this.billerService.policyMappingSubject.next(true);
    this.modalService.create({
      nzTitle: 'Update Policy Mapping.',
      nzContent: PayerInsuranceMappingComponent,
      nzWidth: '80vw',
      nzFooter: null
    });



  }

  umbrellaFundPolicy() {

    this.modalService.create({
      nzTitle: 'Umbrella Policy.',
      nzContent: UmbrellaFundPolicyComponent,
      nzWidth: '80vw',
      nzFooter: null
    });

  }

  setIndex(ii) {
    this.aa = ii;
  }


}
