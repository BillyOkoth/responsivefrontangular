import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

const routes: Routes = [

  {
    path: 'activate-account',
    component: ActivateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOpeningRoutingModule { }
