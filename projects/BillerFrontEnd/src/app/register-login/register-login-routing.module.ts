import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterAccountComponent } from './register/register-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailResetComponent } from './email-reset/email-reset.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OtpComponent } from './otp/otp.component';
import { OtpCodeComponent } from './otp-code/otp-code.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { PayerApprovalComponent } from './payer-approval/payer-approval.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },

  {
    path: 'email-reset',
    component: EmailResetComponent
  },

  {
    path: 'set-password',
    component: ActivateAccountComponent
  },
  {
    path: 'sms-reset',
    component: OtpComponent
  },
  {
    path: 'payer-approval',
    component: PayerApprovalComponent
  },

  {
    path: 'sms-code',
    component: OtpCodeComponent
  },
  {
    path: 'register',
    component: RegisterAccountComponent
  },

  {
    path: 'terms',
    component: TermsOfServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterLoginRoutingModule {}
