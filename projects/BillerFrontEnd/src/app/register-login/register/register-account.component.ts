import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { RegisterBiller } from '../../service/login.model';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ParticlesConfig } from 'particles-config';

declare const intlTelInput: any;
declare var particlesJS: any;
declare const indexPath: any;

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {
  loading = false;
  formdata;
  capturedToken: any;
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  password = '';
  adminMenu = [];
  allowedMenus = [];
  PHONE_PLUGIN: any;
  phone_no: any;
  phoneError: boolean;
  phone: any;
  error: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private routers: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
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

  registerForm = new FormGroup({
    companyName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phonenumber: new FormControl(''),
    newpassword: new FormControl(''),
    confirmpassword: new FormControl('')
  });

  ngOnInit() {
    this.token();
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      newpassword: ['', Validators.required],
      phonenumber: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }
  token() {
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

  registerBiller() {
    const formdata = this.registerForm.value;

    if (
      formdata.newpassword !== formdata.confirmpassword ||
      formdata.confirmpassword !== formdata.newpassword
    ) {
      this.toastr.warning('Passwords do not match');
      this.loading = false;
    } else {
      formdata.newpassword === formdata.confirmpassword ||
        formdata.confirmpassword === formdata.newpassword;

      const payload: RegisterBiller = {
        company_name: formdata.companyName,
        fname: formdata.firstName,
        lname: formdata.lastName,
        password: formdata.confirmpassword,
        biller_phone: this.phone
      };

      this.loading = true;
      this.loginService.registerBiller(payload).subscribe(
        (response: any) => {
          this.loading = false;
          this.loginService.companyCode = response.companyCode;
          sessionStorage.setItem('user-type', response.user_type);

          this.adminMenu = response.adminMenu;

          if (response.messageCode == '00') {
            this.toastr.success(response.message, 'Success');
            response.adminMenu.forEach(value => {
              this.allowedMenus.push(value.menuName);
              sessionStorage.setItem(
                'access',
                JSON.stringify(this.allowedMenus)
              );
            });

            if (response.adminMenu) {
              this.adminMenu.forEach((value: any) => {
                if (value.menuName === 'DashBoard') {
                  sessionStorage.setItem('DashBoard', value.menuName);
                } else if (value.menuName === 'My Payers') {
                  sessionStorage.setItem('My_Payers', value.menuName);
                } else if (value.menuName === 'maintain Account(s)') {
                  sessionStorage.setItem('My_Account', value.menuName);
                } else if (value.menuName === 'Invoices') {
                  sessionStorage.setItem('Invoices', value.menuName);
                } else if (value.menuName === 'Eslips Generated') {
                  sessionStorage.setItem('eslips', value.menuName);
                } else if (value.menuName === 'Reports') {
                  sessionStorage.setItem('Reports', value.menuName);
                } else if (value.menuName === 'My Team') {
                  sessionStorage.setItem('My_Team', value.menuName);
                } else if (value.menuName === 'Eslip(s)') {
                  sessionStorage.setItem('Eslip', value.menuName);
                }
              });
            }

            this.router.navigate(['/app/view-billers']).then(() => {
              this.loading = false;
            });
          } else if (response.messageCode === '01') {
            this.registerForm.reset();
            this.ngOnInit();

            this.toastr.warning(response.message, 'Warning');
            this.ngOnInit();

            this.loading = false;
          } else if (response.messageCode === '02') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '03') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '04') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '04') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '05') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '06') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '07') {
            this.ngOnInit();
            this.registerForm.reset();

            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          } else if (response.messageCode === '08') {
            this.ngOnInit();
            this.registerForm.reset();
            this.toastr.warning(response.message, 'Warning');
            this.loading = false;
          }
        },
        (err: any) => {
          this.loading = false;
        }
      );
    }
  }

  loginBiller() {
    this.router.navigate(['login/']);
  }

  checkPassword() {
    this.password = this.registerForm.value.password;
  }

  public hasError1 = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  hasError(Success) {
    if (!Success) {
      this.error = true;
    }
  }
  getNumber() {
    let s = this.registerForm.value.phonenumber;
    while (s.charAt(0) === '+') {
      // remove + sign
      s = s.substr(1);
    }
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `254${s}`;
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

  validatePhone() {
    this.getNumber();
  }

  toHomePage() {
    location.href = indexPath;
  }
}
