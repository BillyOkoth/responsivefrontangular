import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { LoginBiller, EmailReset } from '../../service/login.model';
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
  selector: 'app-email-reset',
  templateUrl: './email-reset.component.html',
  styleUrls: ['./email-reset.component.css']
})

export class EmailResetComponent implements OnInit {



  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  loading = false;
  msgs = [];

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  emailResetForm = new FormGroup({
    email: new FormControl('')
  });

  ngOnInit() {
    this.invokeParticles();
    this.emailResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]]
    });

  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }
  // function for sending the email
  emailReset() {
    if (this.emailResetForm.valid) {
      const formdata = this.emailResetForm.value;
      const payload: EmailReset = {
        email: formdata.email
      };

      this.loading = true;
      this.loginservice.emailReset(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode === '00') {
            this.toastr.success(response.message, 'Success');

          } else if (response.messageCode === '02') {
            this.toastr.warning(response.message, 'Warning');

          } else if (response.messageCode === '06') {
            this.toastr.warning(response.message, 'Warning');

          } else if (response.messageCode === '07') {
            this.toastr.warning(response.message, 'Warning');

          }
        },
        (err: any) => {

        }
      );
    }
  }

  /**
   * @description:  send user back to home page
   */
  toHomePage() {
    // location.href = "https://10.235.6.200/landing/";
    location.href = indexPath;
  }
  toLoginPage() {
    this.router.navigate(['/login']);
  }

  registerBiller() {
    this.router.navigate(['biller/register']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.emailResetForm.controls[controlName].hasError(errorName);
  }
}
