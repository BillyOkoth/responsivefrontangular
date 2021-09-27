import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RealDashboardComponent } from './real-dashboard/real-dashboard.component';
import { ViewPayersComponent } from './view-payers/view-payers.component';
import { GeneratedEslipComponent } from './generated-eslip/generated-eslip.component';
import { DepartmentsComponent } from './departments/departments.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { ServiceChargeComponent } from './service-charge/service-charge.component';
import { EslipsAccountsComponent } from './eslips-accounts/eslips-accounts.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyPayersComponent } from './view-payers/payers/my-payers/my-payers.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ReportsComponent } from './reports/reports.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { ReceiptComponent } from './generated-eslip/receipt/receipt.component';
import { AuthGuardService } from '../auth-guard.service';
import { CustomizeInvoiceComponent } from './invoices/customize-invoice/customize-invoice.component';
import { InvoiceComponent } from './dashboard/invoice/invoice.component';
import { UploadedInvoiceDetailsComponent } from './dashboard/invoice/uploaded-invoice-details/uploaded-invoice-details.component';
import { PayerProfileComponent } from './view-payers/payers/payer-profile/payer-profile.component';
import { BankStatementComponent } from './bank-statement/bank-statement.component';
import { SettingsComponent } from './settings/settings.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { MapInvoiceComponent } from './view-payers/payer-map-modal/map-invoice/map-invoice.component';
import { UploadSampleComponent } from './view-payers/payer-map-modal/upload-sample/upload-sample.component';
import { PoliciesComponent } from './liberty-journey/checkoff/policies/policies.component';
import { PolicyPayerComponent } from './liberty-journey/policy-payer/policy-payer.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: RealDashboardComponent,
      },
      {
        path: 'welcome-screen',
        component: WelcomeScreenComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['DashBoard'],
        },
      },
      {
        path: 'customize-invoice',
        component: CustomizeInvoiceComponent,
        data: {
          allowedRoles: ['DashBoard'],
        },
      },
      { path: 'policies', component: PoliciesComponent },
      {
        path: 'view-payers',
        component: ViewPayersComponent,
      },
      {
        path: 'policy-payer',
        component: PolicyPayerComponent
      },

      {
        path: 'payer-profile',
        component: PayerProfileComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'my-payers',
        component: MyPayersComponent,
        // canActivate: [AuthGuardService,AuthorizationGuard],
      },
      {
        path: 'upload-sample',
        component: UploadSampleComponent,
      },
      {
        path: 'map-columns',
        component: MapInvoiceComponent,
      },
      {
        path: 'welcome-screen',
        component: WelcomeScreenComponent,
      },
      {
        path: 'receipt-eslip',
        component: ReceiptComponent,
      },

      {
        path: 'generated-e-slip',
        component: GeneratedEslipComponent,
      },
      {
        path: 'bank-statement',
        component: BankStatementComponent,
      },

      {
        path: 'my-team',
        // component: MyTeamComponent,
        component: TeamsComponent,
      },
      {
        path: 'commissions',
        component: CommissionsComponent,
      },

      {
        path: 'biller-e-slip-ac',
        component: EslipsAccountsComponent,
      },
      {
        path: 'biller-exceptions',
        component: ExceptionsComponent,
      },
      // BankStatementComponent
      {
        path: 'service-charge',
        component: ServiceChargeComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
      },

      {
        path: 'reports',
        component: ReportsComponent,
      },

      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'invoice-details',
        component: UploadedInvoiceDetailsComponent,
      },
    ],
  },

  {
    path: 'user-roles',
    component: UserRolesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillerRoutingModule {}
