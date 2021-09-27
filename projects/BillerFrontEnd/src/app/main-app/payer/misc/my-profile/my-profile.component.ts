import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { updatePayerProfile } from '../../../../service/login.model';
import { LoginService } from '../../../../service/login.service';
import { Router } from '@angular/router';
import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  numbererror: boolean;
  phoneError: boolean;
  phone_no: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public loginService: LoginService,
    private myaccountsService: MyAccountsService
  ) { }
  FirstName: any;
  LastName: any;
  EmailAddress: any;
  CompanyName: any;
  phonenumber3 =  '';
  phonenumber2: '';
  errormsgs = [];
  phone: any;

  personel_f_name = '';
  personel_l_name = '';
  email = '';
  company_name = '';
  loading = false;

  mySubscription: any;

  billerLogo = '';

  myProfileForm = new FormGroup({
    companyname: new FormControl(''),
    email_address: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl('')
  });

  ngOnInit() {
    this.FirstName = this.loginService.FirstName;
    this.LastName = this.loginService.LastName;
    this.EmailAddress = this.loginService.emailprofile;
    this.CompanyName = this.loginService.CompanyName;

    this.phonenumber3 = `+${sessionStorage.getItem('billerPhone')}`;

    this.billerLogo = sessionStorage.getItem('biller-logo');

    this.myProfileForm = this.fb.group({
      companyname: ['', Validators.required],
      email_address: [
        '',
        [Validators.required, Validators.email]
      ],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_prefix: ['+254'],
      phonenumber: ['', Validators.required]
    });
    this.myProfileForm.patchValue({
      company_name: this.loginService.CompanyName,
      email_address: this.loginService.emailprofile,
      firstname: this.loginService.FirstName,
      lastname: this.loginService.LastName,
      phonenumber: sessionStorage.getItem('billerPhone').substring(3)
    });

  }

  save() {
    this.loading = true;

    const formData = this.myProfileForm.value;

   if (this.myProfileForm.valid) {
       const payload = {
        company_name: formData.companyname,
        email: formData.email_address,
        personel_f_name: formData.firstname,
        personel_l_name: formData.lastname,
        biller_phone: formData.phone_prefix + formData.phonenumber,
        pay_bill: ''
      };
      this.loginService.updatePayerProfile(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode === '00') {
            this.myaccountsService.updateFirstName(formData.firstname);
            this.myaccountsService.fetchUpdateProfile.next(true);

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
                  : response.messageCode == '05'
                    ? this.toastr.warning(response.message, 'Warning')
                    : response.messageCode == '06'
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
      biller_phone:  this.phonenumber3 ,
      pay_bill: ''
    };
    console.log('p2', payload);

    this.loginService.updatePayerProfile(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode == '00') {
          this.myaccountsService.updateFirstName(formData.firstname);
          this.myaccountsService.fetchUpdateProfile.next(true);

          this.toastr.success(response.message, 'Success');
        }

        // tslint:disable-next-line: triple-equals
        return response.messageCode == '01'
          ? this.toastr.warning(response.message, 'Warning')
          : response.messageCode == '02'
            ? this.toastr.warning(response.message, 'Warning')
            : response.messageCode == '03'
              ? this.toastr.warning(response.message, 'Warning')
              : response.messageCode == '04'
                ? this.toastr.warning(response.message, 'Warning')
                : response.messageCode == '05'
                  ? this.toastr.warning(response.message, 'Warning')
                  : response.messageCode == '06'
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

  back() {
    this.router.navigate(['app/dashboard/customer-dashboard']);
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
}
