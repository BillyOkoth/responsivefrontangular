import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from '../../../service/user-profile.service';
import { LoginService } from '../../../service/login.service';
import {
  payerProfile
} from '../../../service/login.model';

import {
  DomSanitizer,
} from '@angular/platform-browser';

@Component({
  selector: 'app-bella',
  templateUrl: './bella.component.html',
  styleUrls: ['./bella.component.css']
})

export class BellaComponent implements OnInit {
  // @ViewChild('myPond', { static: false }) myPond: any;

  capturedToken: any;
  terms: string;
  selectedFile: File;
  frontSent = false;
  backSent = false;
  email = '';
  fileData: File = null;
  private base64textString: String = '';

  imageSrc;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  // base64s
  sellersPermitString: string;
  DriversLicenseString: string;
  InteriorPicString: string;
  ExteriorPicString: string;

  // selectedFile: File;

  // json
  finalJson = {};

  currentId = 0;
  terms_of_service: any;
  road: any;
  companyname: any;
  county: any;
  phonenumber: any;
  website: any;
  email_address: any;
  company_name;
  payer_road;
  payer_county;
  payer_phonenumber;

  name = 'Angular 4';
  url = '';
  fileName: any;
  brandColor;
  billerBaseColor = '#0A2240';

  path = 'data:image/jpg;base64';

  constructor(
    public userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,

    private loginService: LoginService,

  ) {}

  ngOnInit() {

    this.getInvoice();

    this.fetchPayerProfile();
  }

  // function of converting the image to base 64

  convert(event: any) {
    const FileEvent = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (imageData: any) => {
      const base64 = imageData.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];

      this.url = this.fileName;

      this.loginService.theLogo = this.fileName;
      this.userProfileService.brandImage = this.fileName;
    });

    reader.readAsDataURL(FileEvent);
  }

  onSelectFile(event) {
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = this.handleReaderLoaded.bind(this);
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public delete() {
    this.url = null;
  }
  /// test for the ng zone

  addPictures() {

    this.finalJson = {
      sellersPermitFile: this.ExteriorPicString,
      DriversLicenseFile: this.DriversLicenseString,
      InteriorPicFile: this.InteriorPicString,
      ExteriorPicFile: this.ExteriorPicString
    };
  }

  public picked(event, field) {
    this.currentId = field;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); // turn into base64
      } else if (field == 2) {
        this.DriversLicenseFile = file;
        this.handleInputChange(file); // turn into base64
      } else if (field == 3) {
        this.InteriorPicFile = file;
        this.handleInputChange(file); // turn into base64
      } else if (field == 4) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file); // turn into base64
      }
    } else {
      alert('No file selected');
    }
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }


  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    const id = this.currentId;
    switch (id) {
      case 4:
        this.ExteriorPicString = base64result;
        break;
    }


  }

  getInvoice() {

    const payload: payerProfile = {};

    this.loginService.getInvoiceSettings(payload).subscribe(
      response => {

        this.loginService.termsGlobal = this.terms_of_service;
      },
      err => {

      }
    );
  }

  // fetch the payer profile

  fetchPayerProfile() {
    const payload: payerProfile = {};

    this.loginService.payerProfile(payload).subscribe(response => {
      console.log('payerprofile', response);
      this.company_name = response[0].company_name;
      this.payer_phonenumber = response[0].biller_phone;
      this.payer_county = response[0].country;
      this.payer_road = response[0].biller_location;
      this.userProfileService.brandColor = response[0].brand_theme;
      this.userProfileService.brandImage = response[0].base64Logo;
      this.loginService.globalCompnay = this.company_name;
      this.loginService.globalCounty = this.payer_county;
      this.loginService.globalPhonenumber = this.payer_phonenumber;
      this.loginService.roadGlobal = this.payer_road;

    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  // handling the invoice logo..
}
