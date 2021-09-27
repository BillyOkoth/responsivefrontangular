import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { updatePayerProfile } from '../../service/login.model';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { MyAccountsService } from '../../service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user-service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  phoneError: boolean;
  phone_no: any;
  phone: any;
  brandTheme = '#0033A1';
  billerBaseColor = '#0A2240';
  loading;

  brandColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.billerBaseColor})`;

  phonenumber3 =  '';
  numbererror: boolean;
  phoneNumber: string;
  paybill: any;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private toastr: ToastrService,
    public userService: UserService
  ) {}
  FirstName: any;
  LastName: any;
  EmailAddress: any;
  CompanyName: any;

  personel_f_name = '';
  personel_l_name = '';
  email = '';
  company_name = '';


  mySubscription: any;

  phonenumber2: '';

  billerLogo = '';

  myProfileForm = new FormGroup({
    companyname: new FormControl(''),
    email_address: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl(''),
    pay_bill: new FormControl('')
  });

  ngOnInit() {

    setInterval(() => {
      // TODO: THIS IS A BAD IDEA
      this.brandColor = `linear-gradient(to bottom, ${this.userService.brandColor}, ${this.billerBaseColor})`;
    }, 500);

    this.userService.colorString = this.brandTheme;
    this.FirstName = sessionStorage.getItem('firstname');
    this.LastName = sessionStorage.getItem('lastname');
    this.EmailAddress = sessionStorage.getItem('email');
    this.CompanyName = sessionStorage.getItem('companyname');
    this.phoneNumber =  `+${sessionStorage.getItem('phone')}`;
    this.paybill = sessionStorage.getItem('paybill');
    this.billerLogo = sessionStorage.getItem('biller-logo');

    this.myProfileForm = this.fb.group({
      companyname: ['', Validators.required],
      email_address: [
        '',
        [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]
      ],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_prefix: ['+254'],
      phonenumber: ['', Validators.required],
      pay_bill: ['', Validators.required]
    });
    this.myProfileForm.patchValue({
      company_name: sessionStorage.getItem('companyname'),
      email_address: sessionStorage.getItem('email'),
      firstname: sessionStorage.getItem('firstname'),
      lastname:  sessionStorage.getItem('lastname'),
      phonenumber: sessionStorage.getItem('phone').substring(3)
    });
  }

  save() {
    this.loading = true;


    const formData = this.myProfileForm.value;
    // if (!this.phonenumber2) {
    //   this.phonenumber2 = this.phonenumber3;
    // }

    if (this.myProfileForm.valid) {
      const payload = {
        company_name: formData.companyname,
        email: formData.email_address,
        personel_f_name: formData.firstname,
        personel_l_name: formData.lastname,
        // biller_phone:'+254728826255',
        biller_phone: formData.phone_prefix + formData.phonenumber,
        paybill: formData.pay_bill
      };
      console.log('payload1', payload);
      this.userService.updatePayerProfile(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode === '00') {
            this.userService.updateFirstName(formData.firstname);

            this.toastr.success(response.message, 'Success');
          }


          return response.messageCode === '01'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '02'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '03'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '04'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '05'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '06'
            ? this.toastr.warning(response.message, 'Warning')
            : (this.loading = false);
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error('There is no server connection!');
        }
      );
    } else {
      const payload = {
        company_name: formData.companyname,
        email: formData.email_address,
        personel_f_name: formData.firstname,
        personel_l_name: formData.lastname,
        // biller_phone:'+254728826255',
        biller_phone: this.phoneNumber,
        paybill: formData.pay_bill
      };
      console.log('payload2', payload);
      this.userService.updatePayerProfile(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode === '00') {
            this.userService.updateFirstName(formData.firstname);

            this.toastr.success(response.message, 'Success');
          }

          return response.messageCode === '01'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '02'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '03'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '04'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '05'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode === '06'
            ? this.toastr.warning(response.message, 'Warning')
            : (this.loading = false);
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error('There is no server connection!');
        }
      );


    }
  }




  getNumber() {

    let s = this.myProfileForm.value.phonenumber;
    while (s.charAt(0) === '+') {
      // remove + sign
      s = s.substr(1);
    }
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `+254${s}`;
    }

    if (s.length >= 12) {
      this.phone_no = s;
      this.phoneError = false;
    } else {
      this.phone_no = '';
      this.phoneError = true;
    }

    this.phone = s;

    return s; //
  }
  hasError(Success) {
    if (!Success) {
      this.numbererror = true;
    }
  }

  back() {
    this.location.back();
  }
}
