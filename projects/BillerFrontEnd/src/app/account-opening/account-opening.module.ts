import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningRoutingModule } from './account-opening-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { LoginService } from '../service/login.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/access-token.interceptor';

@NgModule({
  declarations: [ ActivateAccountComponent],
  imports: [
    CommonModule,
    AccountOpeningRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    OverlayModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ]


})
export class AccountOpeningModule {}
