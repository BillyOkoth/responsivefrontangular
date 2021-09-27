import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ParticlesConfig } from 'particles-config';

declare var particlesJS: any;

declare const indexPath: any;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  loading = false;
  msgs = [];
  phone_no: any;
  phoneError: boolean;

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  phone_number: any;
  error: boolean;

  smsResetForm = new FormGroup({
    phonenumber: new FormControl('')
  });

  ngOnInit() {
    this.invokeParticles();
    this.smsResetForm = this.fb.group({
      phonenumber: ['', [Validators.required]]
    });
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  // function for sending the email
  emailReset() {
    if (this.smsResetForm.valid) {
      const formdata = this.smsResetForm.value;
      const payload = {
        phone: this.phone_number
      };
      this.loading = true;
      this.loginservice.getOtpCode(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode == '00') {
            this.toastr.success(response.message, 'Success');

            sessionStorage.setItem('otp_email', response.email);
            sessionStorage.setItem('otp_phone', response.phone);
            sessionStorage.setItem('otp_comp_code', response.comp_code);
            sessionStorage.setItem('otp_name', response.name);

            this.router.navigate(['/login/sms-code']);
          } else if (response.messageCode == '02') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '07') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {}
      );
    }
  }

  public hasError1 = (controlName: string, errorName: string) => {
    return this.smsResetForm.controls[controlName].hasError(errorName);
  }

  getNumber() {
    const formdata = this.smsResetForm.value;

    let s = formdata.phonenumber;
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

    this.phone_number = s;

    return s; //
  }

  validatePhone() {
    this.getNumber();
  }
  hasError(Success) {
    if (!Success) {
      this.error = true;
    }
  }
  toHomePage() {

      location.href = indexPath;


  }
}
