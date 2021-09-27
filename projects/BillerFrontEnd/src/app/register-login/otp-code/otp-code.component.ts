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

@Component({
  selector: 'app-otp-code',
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.css']
})
export class OtpCodeComponent implements OnInit {

  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  loading = false;
  msgs = [];

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  smsCodeResetForm = new FormGroup({
    smscode: new FormControl('')
  });

  ngOnInit() {
    this.invokeParticles();
    this.smsCodeResetForm = this.fb.group({
      smscode: ['', [Validators.required]]
    });
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }
  verifyOtpCode() {
    if (this.smsCodeResetForm.valid) {
      const formdata = this.smsCodeResetForm.value;
      const payload  = {
        code: formdata.smscode,
        phone: sessionStorage.getItem('otp_phone'),
        comp_code: sessionStorage.getItem('otp_comp_code'),
        email: sessionStorage.getItem('otp_email')

      };

      this.loading = true;
      this.loginservice.verifyOtpCode(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode == '00') {
            sessionStorage.setItem('otp_code', response.code);
            this.toastr.success(response.message, 'Success');
            this.router.navigate(['/login/set-password']);

          } else if (response.messageCode == '02') {
            this.toastr.warning(response.message, 'Warning');

          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');

          } else if (response.messageCode == '07') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {

        }
      );
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.smsCodeResetForm.controls[controlName].hasError(errorName);
  }

  toHomePage() {
    this.router.navigate(['/']);
  }
}
