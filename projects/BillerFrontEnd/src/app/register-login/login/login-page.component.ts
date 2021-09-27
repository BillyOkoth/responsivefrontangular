import { Component, OnInit, ɵConsole } from '@angular/core';
import { LoginService } from '../../service/login.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { NzNotificationService } from 'ng-zorro-antd';

import { ViewBillersComponent } from '../../main-app/payer/misc/view-billers/view-billers.component';
import { AliasService } from '../../service/alias.service';
import { NotifyService } from '../../service/notify.service';
import { BillerIdService } from '../../service/billerId.service';
import { UserProfileService } from '../../service/user-profile.service';
import { ParticlesConfig } from '../../../../../../particles-config';
import { BillerTypeService } from '../../service/billerType.service';

declare const indexPath: any;
declare let particlesJS: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private notification: NzNotificationService,
    private billerTypeService: BillerTypeService,
    private aliasService: AliasService,
    private notifyService: NotifyService,
    private billerIdService: BillerIdService,
    public profileService: UserProfileService
  ) { }
  loading = false;
  billerId = '';
  alias = '';
  notify = '';
  closed_biller_type = '';
  closed_biller_class = '';

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  teamMenu = [];
  adminMenu = [];
  allowedMenus = [];
  fileName = '';

  viewBillers = new ViewBillersComponent(this.router,
     this.loginservice, this.aliasService, this.notifyService, this.billerIdService, this.profileService);

  secretKey = 'hjfdhf$34556029hjfuur%)8839399qkksklk(()q8wj&*9w9kemmm8q8q0nm372901928';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
    this.invokeParticles();
    this.billerIdService.castBillerId.subscribe(billerId => this.billerId = billerId);
    this.aliasService.castAlias.subscribe(alias => this.alias = alias);
    this.notifyService.castNotify.subscribe(notify => this.notify = notify);

    this.billerTypeService.castClosedBillerClass.subscribe(closed_biller_class => this.closed_biller_class = closed_biller_class);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }


  loginBiller() {

    if (this.loginForm.valid) {

      const formdata = this.loginForm.value;

      this.fileName = btoa(formdata.password);

      const payload = {
        email: formdata.email,
        password: this.fileName
      };

      this.loading = true;
      this.loginservice.loginBiller(payload).subscribe(
        (response: any) => {

          sessionStorage.setItem('closed_biller_type', response.body.closed_biller_type);


          sessionStorage.setItem('closed_biller_type', response.body.closed_biller_type);

          sessionStorage.setItem(
            'h-token',
            response.headers.get('Authorization')
          );
          sessionStorage.setItem('company_name', response.body.company_name);
          sessionStorage.setItem('user-type', response.body.user_type);
          sessionStorage.setItem('loginvalue', response.body.loginvalue);

          if (
            response.body.messageCode == '00' ||
            response.body.messageCode == '12'
          ) {
            this.loginservice.tokenGlobal = response.body.token;
            this.loginservice.userType = response.body.user_type;
            response.body.policy_type.forEach(
              (value: any) => {

                if (value.type.toLowerCase() == 'checkoff') {
                  sessionStorage.setItem('check-off', value.type);
                } else if (value.type.toLowerCase() == 'umbrella') {
                  sessionStorage.setItem('general', value.type);
                } else { }




              });


            sessionStorage.setItem('name_group', response.body.group_name);

            this.loginservice.companyCode = response.body.companyCode;
            this.loginservice.phoneNumber = response.body.biller_phone;

            sessionStorage.setItem('comp_code', response.body.companyCode);
            this.teamMenu = response.body.menus;
            this.adminMenu = response.body.adminMenu;
            if (response.body.adminMenu) {
              response.body.adminMenu.forEach(value => {
                this.allowedMenus.push(value.menuName);
                sessionStorage.setItem(
                  'access',
                  JSON.stringify(this.allowedMenus)
                );
              });
            }

            if (response.body.menus) {
              response.body.menus.forEach(value => {
                this.allowedMenus.push(value.menuName);
                sessionStorage.setItem(
                  'access',
                  JSON.stringify(this.allowedMenus)
                );
              });
              this.teamMenu.forEach((value: any) => {
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

            if (response.body.adminMenu) {
              this.adminMenu.forEach((value: any) => {
                if (value.menuName === 'DashBoard') {
                  sessionStorage.setItem('DashBoard', value.menuName);
                } else if (value.menuName === 'My Payers') {
                  sessionStorage.setItem('My_Payers', value.menuName);
                } else if (value.menuName == 'maintain Account(s)') {
                  sessionStorage.setItem('My_Account', value.menuName);
                } else if (value.menuName == 'Invoices') {
                  sessionStorage.setItem('Invoices', value.menuName);
                } else if (value.menuName == 'Eslips Generated') {
                  sessionStorage.setItem('eslips', value.menuName);
                } else if (value.menuName == 'Reports') {
                  sessionStorage.setItem('Reports', value.menuName);
                } else if (value.menuName == 'My Team') {
                  sessionStorage.setItem('My_Team', value.menuName);
                } else if (value.menuName == 'Eslip(s)') {
                  sessionStorage.setItem('Eslip', value.menuName);
                } else if (value.menuName == 'Policies') {
                  sessionStorage.setItem('Policies', value.menuName);
                }
              });
            }
          }

          if (
            response.body.messageCode == '00' &&
            response.body.loginvalue == '0' &&
            response.body.user_type == 'biller'
          ) {
            return this.router
              .navigate(['/biller/dashboard/welcome-screen'])
              .then(() => {
                sessionStorage.setItem(
                  'biller-type',
                  response.body.biller_type
                );
                this.toastr.success(response.body.message, 'Success');
                this.loading = false;
              });
          }

          if (response.body.messageCode == '12') {
            sessionStorage.setItem('biller-type', response.body.biller_type);
            return this.router.navigate(['/biller/dashboard']).then(() => {
              this.toastr.warning(response.body.message, 'Warning');
              this.loading = false;
            });
          }

          if (
            response.body.messageCode == '00' &&
            response.body.loginvalue == '1' &&
            response.body.user_type == 'biller'
          ) {
            sessionStorage.setItem('biller-type', response.body.biller_type);
            return this.router.navigate(['/biller/dashboard']).then(() => {
              this.toastr.success(response.body.message, 'Success');
              this.loading = false;
            });
          }

          if (
            response.body.messageCode == '00' &&
            response.body.user_type == 'payer'
          ) {

            if (this.billerId === '' || this.alias === '' || this.notify === '') {
              return this.router.navigate(['/app/view-billers']).then(() => {
                this.toastr.success(response.body.message, 'Success');
                this.loading = false;
              });
            } else {

              this.viewBillers.billerPage(this.billerId, this.alias, this.notify, this.closed_biller_class);
            }


          }

          if (response.body.messageCode === '02') {
            this.loading = false;
            return this.toastr.warning(response.body.message, 'Warning');
          }

          if (response.body.messageCode === '05') {
            this.loading = false;
            return this.toastr.warning(response.body.message, 'Warning');
          }
          if (response.body.messageCode === '06') {
            this.loading = false;

            this.toastr.warning(response.body.message);


          } else if (response.body.messageCode === '09') {
            this.loading = false;

            this.toastr.warning(response.body.message);

            this.router.navigate(['/login/email-reset']);

          }
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error('There is no server connection !');
        }
      );
    }
  }

  toHomePage() {
    location.href = indexPath;
  }
  toRegister() {
    this.router.navigate(['login/register']);
  }

  registerBiller() {
    this.router.navigate(['biller/register']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  accessedMenus() {
    this.adminMenu.forEach(value => { });
  }

  testEnter(event) { }
}
