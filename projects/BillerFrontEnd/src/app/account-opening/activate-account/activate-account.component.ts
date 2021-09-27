import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../service/login.service';
import {
  ResetPassword,
  Model,
  ChangePassword,
  ConfirmBiller
} from '../../service/login.model';

import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../custom-validators';
import { AliasService } from '../../service/alias.service';
import { BillerTypeService } from '../../service/billerType.service';
import { BillerIdService } from '../../service/billerId.service';
import { NotifyService } from '../../service/notify.service';
import { ViewBillersComponent } from '../../main-app/payer/misc/view-billers/view-billers.component';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
  providers: [LoginService]
})
export class ActivateAccountComponent implements OnInit {
  activateForm: FormGroup;
  // loading: boolean;
  capturedToken: any;
  activatedBillerName: any;
  activatedBillerEmail: any;
  loading = false;
  teamMenu = [];

  billerType = '';

  systemUserType: any;

  // changing password
  model: Model = new Model();
  changePasswordModel: ChangePassword = new ChangePassword();
  passwordForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  password: any;
  allowedMenus = [];

  constructor(
    private router: ActivatedRoute,
    private routers: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private aliasService: AliasService,
    private billerIdService: BillerIdService,
    private billerClassService: BillerTypeService,
    private notifyService: NotifyService,
    private loginservice: LoginService,
    public profileService: UserProfileService
  ) { }

  viewBillers = new ViewBillersComponent(this.routers, this.loginservice, this.aliasService, this.notifyService, this.billerIdService, this.profileService);

  ngOnInit() {
    this.activateForm = this.fb.group({

      newPass: [
        null,
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])
      ],

      confirmPass: [null, Validators.compose([Validators.required])]
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });
    this.router.queryParams.subscribe(params => {
      const tokenSent = params['token'];
      this.capturedToken = tokenSent;

      sessionStorage.setItem('h-token', tokenSent);
    });

    this.activate();
  }
  // using the captured token to proceed a nd activate the billers account
  activate() {
    const payload = {};

    this.loginService.confirmBiller(payload).subscribe(response => {
      if (this.activatedBillerEmail === '') {
        this.ngOnInit();
      } else {
        (this.activatedBillerName = response.fname),
          (this.activatedBillerEmail = response.email);
      }
    });

  }

  // method for changing the password
  submitPasswordChange() {
    this.loading = true;
    const formData = this.activateForm.value;

    if (formData.newPass !== formData.confirmPass) {
      this.toastr.warning('Passwords do not match');
      this.loading = false;
    } else {
      formData.confirmPass === formData.newPass;
      this.changePasswordModel.password = this.model.password;

      // post the new password set call the service.!

      const payload: ResetPassword = {
        password: formData.confirmPass
      };

      this.loginService.passwordReset(payload).subscribe(
        (response: any) => {

          const loginValue = sessionStorage.getItem('loginvalue');
          sessionStorage.setItem('loginvalue', response.loginvalue);
          sessionStorage.setItem('biller-type', response.biller_type);
          this.billerType = response.biller_type;
          sessionStorage.setItem('user-type', response.user_type);
          sessionStorage.setItem('closed_biller_type', response.closed_biller_type);

          if (response.messageCode === '00' && response.user_type === 'payer') {
            if (response.adminMenu) {
              this.teamMenu = response.adminMenu;
              response.adminMenu.forEach(value => {
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
            
            if(response.policy_type) {
              response.policy_type.forEach(
                (value: any) => {
                  console.log(value)
                  if (value.type.toLowerCase() == 'checkoff') {
                    sessionStorage.setItem('check-off', value.type);
                  } else if (value.type.toLowerCase() == 'umbrella') {
                    console.log('called')
                    sessionStorage.setItem('general', value.type);
                  } else { }
                });
            }

            this.viewBillers.billerPage(response.viewBillerProfile[0].biller_code,
              response.viewBillerProfile[0].alias,
              response.viewBillerProfile[0].notif_value,
              response.viewBillerProfile[0].closed_biller_type);
          }

          if (response.messageCode === '00' && this.billerType === 'Open') {
            response.adminMenu.forEach(value => {
              this.allowedMenus.push(value.menuName);
              sessionStorage.setItem(
                'access',
                JSON.stringify(this.allowedMenus)
              );
            });
            return this.routers
              .navigate(['/biller/dashboard/welcome-screen'])
              .then(() => {
                this.loading = false;
                this.toastr.success(response.message, 'Success');
              });
          } else if (response.messageCode === '07') {
            this.loading = false;
            this.routers.navigate(['/login']);
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '08') {
            this.loading = false;
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '02') {
            this.loading = false;
            this.toastr.warning(response.message, 'Warning');
          }

          if (response.messageCode === '00' && this.billerType === 'Closed') {
            return this.routers
              .navigate(['/biller/dashboard/welcome-screen'])
              .then(() => {
                this.loading = false;
                this.toastr.success(response.message, 'Success');
              });
          } else if (response.messageCode === '07') {
            this.loading = false;
            this.routers.navigate(['/login']);
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '08') {
            this.loading = false;
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '02') {
            this.loading = false;
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {
          this.loading = false;
        }
      );
    }
  }

  checkPassword() {
    this.password = this.activateForm.value.newPass;
  }
}
