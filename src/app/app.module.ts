import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './bank/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { ErrorPageComponent } from './bank/misc/error-page/error-page.component';
import { ParticlesModule } from 'angular-particle';

import { TokenInterceptor } from './core/interceptors/TokenInterceptor';
import { HttpErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthInterceptor } from './core/interceptors/access-token.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { RedirectGuardService } from './core/guards/redirect-guard.service';
import { AuthorizationService } from './bank/misc/authorization/authorization.service';
import { AccessDeniedComponent } from './bank/misc/authorization/access-denied/access-denied.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { LoginService } from './bank/home-page/login.service';
import { OnboardingService } from './core/services/onboarding/onboarding.service';
import { AlertsService } from './shared/alerts.service';
import { ExcelDataService } from './core/services/excel/excel-data.service';
import { EslipsService } from './core/services/eslips/eslips.service';
import { AccountService } from './core/services/accounts/account.service';
import { TeamsServiceService } from './bank/myteam/teams-service.service';
import { CountryBranchService } from './core/services/country-branch/country-branch.service';
import { DashboardService } from './core/services/dashboard/dashboard.service';
import { BoardingStepsService } from './core/services/boarding-service/boarding.service';
import { BillersService } from './core/services/billers/billers.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
 // optional, provides moment-style pipes for date formatting

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ErrorPageComponent,
    AlertComponent,
    AccessDeniedComponent,
   
    // PolicyTabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      closeButton: true,
      preventDuplicates: false
    }),
    NgZorroAntdModule,
    Ng2TelInputModule,
    NgxChartsModule,
    NzIconModule,
    ScrollingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule
  ],
  providers: [
    AuthGuardService,
    LoginService,
    DashboardService,
    BoardingStepsService,
    RedirectGuardService,
    BillersService,
    TeamsServiceService,
    CountryBranchService,
    AccountService,
    AlertsService,
    OnboardingService,
    ExcelDataService,
    EslipsService,
    AuthorizationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule {}
