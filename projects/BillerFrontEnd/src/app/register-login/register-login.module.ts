import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLoginRoutingModule } from './register-login-routing.module';
import { LoginPageComponent } from './login/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { ParticlesModule } from "angular-particle";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailResetComponent } from './email-reset/email-reset.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OtpComponent } from './otp/otp.component';
import { OtpCodeComponent } from './otp-code/otp-code.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { RegisterAccountComponent } from './register/register-account.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { PayerApprovalComponent } from './payer-approval/payer-approval.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthInterceptor } from '../interceptors/access-token.interceptor';
import { HttpErrorInterceptor } from '../interceptors/error.interceptor';
import { TokenInterceptor } from '../interceptors/TokenInterceptor';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterAccountComponent,
    TermsOfServiceComponent,
    ResetPasswordComponent,
    EmailResetComponent,
    OtpComponent,
    OtpCodeComponent,
    ActivateAccountComponent,
    PayerApprovalComponent
  ],
  imports: [
    CommonModule,
    RegisterLoginRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    OverlayModule,
    NgZorroAntdModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US }

  ]
})
export class RegisterLoginModule {}
