import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './login.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,

} from '@angular/forms';

import { BoardingStepsService } from '../../core/services/boarding-service/boarding.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../core/services/app-service/app.service';
import { ParticlesConfig } from 'particles-config';

declare let particlesJS: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  loading = false;

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  allowedMenus = [];
  menus;
  allowedActions = [];
  menuRights = [];
  secretKey = 'YT65trwefbb%%%#$@syfsdfvgdsda00947dn+-004yhhhd';
  keySize = 256;
  ivSize = 128;
  iterations = 100;
  fileName;
  loginForm: FormGroup;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private loginservice: LoginService,
    private logintoken: BoardingStepsService,
    private boardSteps: BoardingStepsService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.invokeParticles();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }
  // login user to backend system
  loginUser() {
    const formData = this.loginForm.value;
    this.fileName = btoa(formData.password);
    if (this.loginForm.valid) {

      const payload = {
        email: formData.username,
        password: this.fileName
      };


      this.loading = true;
      this.loginservice.loginnUser(payload).subscribe(
        (response: any) => {


          switch (response.messageCode) {
            case '01':
              this.loading = false;
              this.toastr.warning(response.message, 'Warning');
              break;

            case '02':
              this.loading = false;
              this.toastr.warning(response.message, 'Warning');
              break;

            case '06':
              this.loading = false;
              this.toastr.warning(response.message, 'Warning');
              break;

            case '07':
              this.loading = false;
              this.toastr.warning(response.message, 'Warning');
              break;

            default:

              this.toastr.success(response.message, 'Success');
              sessionStorage.setItem('username', response.username);
              this.boardSteps.usertoken = response.token;
              this.boardSteps.bankntken = response.fname;
              this.appService.setUserLoggedIn(true);


              this.router.navigate(['/admin']).then(() => {
                this.loading = false;
              });


              response.menus.forEach(value => {
                this.allowedMenus.push(value.menuName);
                sessionStorage.setItem(
                  'access',
                  JSON.stringify(this.allowedMenus)
                );
              });
              response.menus.forEach(value => {
                this.menuRights.push(value);
                sessionStorage.setItem(
                  'menuRights',
                  JSON.stringify(this.menuRights)
                );
                this.allowedActions.push(value);
                sessionStorage.setItem(
                  'actions',
                  JSON.stringify(this.allowedActions)
                );
              });
              // if (response.menus) {
              //   response.menus.forEach((value: any) => {
              //     if (value.menuName == 'DashBoard') {
              //       sessionStorage.setItem('DashBoard', value.menuName);
              //     } else if (value.menuName == 'Payers') {
              //       sessionStorage.setItem('Payers', value.menuName);
              //     } else if (value.menuName == 'Maintain Accounts') {
              //       sessionStorage.setItem('My_Account', value.menuName);
              //     } else if (value.menuName == 'Invoices') {
              //       sessionStorage.setItem('Invoices', value.menuName);
              //     } else if (value.menuName == 'Eslip') {
              //       sessionStorage.setItem('eslips', value.menuName);
              //     } else if (value.menuName == 'Reports') {
              //       sessionStorage.setItem('Reports', value.menuName);
              //     } else if (value.menuName == 'My Team') {
              //       sessionStorage.setItem('My_Team', value.menuName);
              //     } else if (value.menuName == 'Eslip(s)') {
              //       sessionStorage.setItem('Eslip', value.menuName);
              //     } else if (value.menuName == 'Billers') {
              //       sessionStorage.setItem('Billers', value.menuName);
              //     } else if (value.menuName == 'Billers') {
              //       sessionStorage.setItem('Billers', value.menuName);
              //     }
              //   });
              // }
              break;
          }
          // if (response.messageCode === '01') {
          //   this.toastr.warning(response.message, 'Warning');
          //   this.loading = false;

          // } else if (response.messageCode === '02') {
          //   this.toastr.warning(response.message, 'Warning');
          //   this.loading = false;
          // } else if (response.messageCode === '06') {
          //   this.toastr.warning(response.message, 'Warning');
          //   this.loading = false;
          // } else if (response.messageCode === '07') {
          //   this.toastr.warning(response.message, 'Warning');
          //   this.loading = false;
          // } else { }
        },
        err => {
          this.loading = false;
          this.toastr.error('There is a problem with the server');
        }
      );
      // this.router.navigate(['/admin']);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  testModal() { }
  loginBiller() { }

  toHomePage() { }
}
