import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../service/user-profile.service';
import { LoginService } from '../../../service/login.service';
import { FetchInvoice, payerProfile } from '../../../service/login.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  capturedToken;
  brandTheme = '';
  billerBaseColor = '#0A2240';
  terms_of_service;
  logoSrc;
  company_name;
  payer_road;
  payer_county;
  payer_phonenumber;

  // brandColor = `linear-gradient(to bottom, ${this.brandTheme}, ${
  //   this.billerBaseColor
  // })`;

  constructor(
    public loginService: LoginService,
    private userProfileService: UserProfileService,
    private router: ActivatedRoute
  ) {
    this.router.queryParams.subscribe(params => {
      const tokenSent = params['token'];


      sessionStorage.setItem('h-token', tokenSent);



      this.capturedToken = tokenSent;
    });
  }

  ngOnInit() {


    this.loginService.colorString = this.brandTheme;


    this.fetchInvoiceSettings();
    this.fetchPayerProfile();
    this.fetchLogo();
  }

  // consumption from the api.

  fetchLogo() {
    const payload: FetchInvoice = {};
    this.loginService.fetchInvoiceLogo(payload).subscribe(response => {
      this.logoSrc = response.base64Logo;
    });
  }

  // fetching the invoice settings
  fetchInvoiceSettings() {
    const payload: payerProfile = {};

    this.loginService.getInvoiceSettings(payload).subscribe(response => {
      this.brandTheme = response[0].invoice_color;

      this.terms_of_service = response[0].terms;


    });
  }

  /// fetch the details of the company details

  fetchPayerProfile() {
    const payload: payerProfile = {};

    this.loginService.payerProfile(payload).subscribe(response => {
      this.company_name = response[0].company_name;
      this.payer_phonenumber = response[0].biller_phone;
      this.payer_county = response[0].country;
      this.payer_road = response[0].biller_location;
    });
  }
}
