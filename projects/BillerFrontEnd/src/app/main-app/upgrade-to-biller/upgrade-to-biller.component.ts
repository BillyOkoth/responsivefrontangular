import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../../service/biller-service/biller.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upgrade-to-biller',
  templateUrl: './upgrade-to-biller.component.html',
  styleUrls: ['./upgrade-to-biller.component.css']
})
export class UpgradeToBillerComponent implements OnInit {
  name;
  upgradeBillerForm;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private billerService: BillerService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.name = sessionStorage.getItem('name');

    this.upgradeBillerForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  closeModal(): void {

  }

  upgradeBiller() {
    this.loading = true;
    const companyCode = sessionStorage.getItem('companyCode');

    const payload = {
      companyCode
    };
    this.billerService.changeToBiller(payload).subscribe((response: any) => {
      this.billerService.flagToBiller = response.flag;
      this.loading = false;

      sessionStorage.removeItem('user-type');
      this.toastr.info(response.message);
    });
  }
}
