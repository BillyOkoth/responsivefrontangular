import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AccessDeniedComponent } from './main-app/payer/misc/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'account-opening',
    loadChildren:
      () => import('./account-opening/account-opening.module').then(m => m.AccountOpeningModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./main-app/main-app.module').then(m => m.MainAppModule)
  },
  {
    path: 'biller',
    loadChildren: () => import('./biller/biller.module').then(m => m.BillerModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./biller/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./register-login/register-login.module').then(m => m.RegisterLoginModule)
  },
  { path: '404', component: ErrorPageComponent },
  { path: 'access', component: AccessDeniedComponent },

  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
