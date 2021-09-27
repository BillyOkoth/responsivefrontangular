import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './bank/home-page/home-page.component';
import { ErrorPageComponent } from './bank/misc/error-page/error-page.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AccessDeniedComponent } from './bank/misc/authorization/access-denied/access-denied.component';

const routes: Routes = [
  {

    path: '',
    component: HomePageComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./bank/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService]
  },

  { path: '404', component: ErrorPageComponent },
  { path: 'access', component: AccessDeniedComponent },

  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
