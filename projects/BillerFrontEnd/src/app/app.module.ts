import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModalComponent } from './home-page/home-modal/home-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TokenInterceptor } from './interceptors/TokenInterceptor';

import { HttpErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/access-token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AccessDeniedComponent } from './main-app/payer/misc/access-denied/access-denied.component';
import { AlertComponent } from './shared/alert/alert.component';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { RegisterLoginModule } from './register-login/register-login.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';

// Import what you need. RECOMMENDED. ✔️
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeModalComponent,
    ErrorPageComponent,
    AccessDeniedComponent,
    AlertComponent
  ],
  imports: [
    NzIconModule,
    BrowserModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    OverlayModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      closeButton: true,
      preventDuplicates: false
    }),
    ScrollToModule.forRoot(),
    Ng2TelInputModule,
    RegisterLoginModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule
  ],
  entryComponents: [HomeModalComponent, AlertComponent, HomePageComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
