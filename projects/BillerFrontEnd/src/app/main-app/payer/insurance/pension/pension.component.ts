import { Component, OnInit } from '@angular/core';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { PayerInsuranceMappingComponent } from '../payer-insurance-mapping/payer-insurance-mapping.component';
import { PayerUploadTabComponent } from '../payer-upload-tab/payer-upload-tab.component';
import { InsurancePayerMapComponent } from '../insurance-payer-map/insurance-payer-map.component';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { UmbrellaFundPolicyComponent } from '../umbrella-fund-policy/umbrella-fund-policy.component';

@Component({
  selector: 'app-pension',
  templateUrl: './pension.component.html',
  styleUrls: ['./pension.component.css']
})
export class PensionComponent implements OnInit {
  loading = false ;
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

    this.loading = true ;
    const payload = {
      biller_code:  this.insurance_code,
    };
    this.rows = [];
    this.outInvoice = [];

    this.billerService.payerGetPolicyMapping(payload).subscribe(
      (response: any) => {
        this.loading = false ;
        this.rows = response;
        
        // && value.policy_type.toLowerCase() === 'umbrella'
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

  handleChange(e) {
    this.billerService.selectedTab = e;
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
