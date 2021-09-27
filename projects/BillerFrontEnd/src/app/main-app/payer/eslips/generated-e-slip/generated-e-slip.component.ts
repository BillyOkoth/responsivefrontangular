import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../../maintain-accounts/view-accounts/view-accounts.component';
import { Router } from '@angular/router';
import { EslipAc } from '../../../../service/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generated-e-slip',
  templateUrl: './generated-e-slip.component.html',
  styleUrls: ['./generated-e-slip.component.css']
})
export class GeneratedESlipComponent implements OnInit {
  billerType;
  constructor(
    public loginService: LoginService
  ) {}
  ngOnInit() {

    this.billerType = sessionStorage.getItem('biller-type');

  }



  handleChange(e) {
    this.loginService.selectedTab = e;
  }

}
