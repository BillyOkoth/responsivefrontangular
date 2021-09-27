import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { LoginBiller, Reset } from '../../service/login.model';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var particlesJS: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private routers: ActivatedRoute
  ) {}
  loading = false;
  capturedToken: any;
  msgs = [];
  passmsgs = [];
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  disabledButton = true;

  loginForm = new FormGroup({
    newPass: new FormControl(''),
    confirmPass: new FormControl('')
  });

  ngOnInit() {
    this.loginForm = this.fb.group({
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    });

    this.routers.queryParams.subscribe(params => {
      if (params.hasOwnProperty('token')) {
        this.capturedToken = params.token;
        sessionStorage.setItem('h-token', this.capturedToken);
      } else {
        const keys = Object.keys(params);

        for (const key of keys) {
          if (key.length > 20) {
            const tokenArray = key.split('=');

            this.capturedToken = tokenArray[1];
          }
        }
      }
    });
    sessionStorage.setItem('h-token', this.capturedToken);
  }

  // function that logs in the biller


  /**
   * @description:  send user back to home page
   */
  toHomePage() {
    this.router.navigate(['/']);
  }

  /**
   * @description:  confirmation of the password reset
   */

  resetPassword() {

    this.loading = true;

    const formData = this.loginForm.value;
    if (formData.newPass != formData.confirmPass) {
      this.loading = false;
      this.toastr.warning('Passwords do not match !');


    } else if (formData.confirmPass == formData.newPass) {
      this.toastr.success('Passwords Match.');

      const payload: Reset = {
        password: formData.confirmPass
      };

      this.loginservice.resetPassword(payload).subscribe((response: any) => {
        if (response.messageCode == '00') {
          this.disabledButton = false;
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/login']).then(() => {
            this.loading = false;
          });

        } else if (response.messageCode == '01') {
          this.loading = false;
          this.router.navigate(['login/reset-password']);
          this.toastr.warning(response.message, 'Warning');

          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else if (response.messageCode == '03') {
          this.router.navigate(['login/reset-password']);
          this.loading = false;
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else if (response.messageCode == '06') {
          this.router.navigate(['login/reset-password']);
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else if (response.messageCode == '08') {
          this.router.navigate(['login/reset-password']);
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }),
        (err: any) => {

        };
    } else {
    }
  }

  login() {
    this.router.navigate(['login/']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
