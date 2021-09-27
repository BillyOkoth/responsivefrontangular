import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './payer/payer-dashboard/dashboard/dashboard.component';
import { RealDashboardComponent } from './payer/payer-dashboard/real-dashboard/real-dashboard.component';
import { OpenBillerAdminComponent } from './payer/maintain-accounts/open-biller-admin/open-biller-admin.component';
import { ViewBillersComponent } from './payer/misc/view-billers/view-billers.component';
import { ViewAccountsComponent } from './payer/maintain-accounts/view-accounts/view-accounts.component';
import { PaymentsComponent } from './payer/eslips/payments/payments.component';
import { GeneratedESlipComponent } from './payer/eslips/generated-e-slip/generated-e-slip.component';
import { ReportsComponent } from './payer/reports/reports.component';
import { UploadedFileSummaryComponent } from './payer/maintain-accounts/uploaded-file-summary/uploaded-file-summary.component';
import { UploadedFileDetailsComponent } from './payer/maintain-accounts/uploaded-file-details/uploaded-file-details.component';
import { MyteamComponent } from './payer/my-team/myteam/myteam.component';
import { CreateMemberComponent } from './payer/my-team/myteam/create-member/create-member.component';
import { UserRolesComponent } from './payer/my-team/user-roles/user-roles.component';
import { UploadedPaymentSummaryComponent } from './payer/eslips/upload-payment-file-dialog/uploaded-payment-summary/uploaded-payment-summary.component';
import { UploadedPaymentDetailsComponent } from './payer/eslips/upload-payment-file-dialog/uploaded-payment-details/uploaded-payment-details.component';
import { RejectedFilesComponent } from './payer/eslips/payments/rejected-files/rejected-files.component';
import { AccountReportsComponent } from './payer/reports/account-report-summary/account-reports/account-reports.component';
import { MyProfileComponent } from './payer/misc/my-profile/my-profile.component';
import { AuthGuardService } from '../auth-guard.service';
import { AuthorizationGuard } from './payer/misc/authorization/authorization.guard';
import { ReceiptComponent } from './payer/eslips/payments/receipt/receipt.component';
import { ReportHistoryComponent } from './payer/reports/report-history/report-history.component';
import { ReportDetailComponent } from './payer/reports/report-detail/report-detail.component';
import { InvoicesComponent } from './payer/invoices/invoices.component';
import { EslipBillsComponent } from './payer/invoices/eslip-bills/eslip-bills.component';
import { ElsipInfoComponent } from './payer/invoices/elsip-info/elsip-info.component';
import { InvoiceAccountsComponent } from './payer/invoices/invoice-accounts/invoice-accounts.component';
import { EslipAccountsComponent } from './payer/eslips/eslip-accounts/eslip-accounts.component';
import { ViewInvoiceComponent } from '../biller/invoices/view-invoice/view-invoice.component';
import { InvoiceComponent } from './payer/invoice/invoice.component';
import { PoliciesComponent } from './payer/policies/policies.component';
import { PolicyTabComponent } from './payer/insurance/policy-tab/policy-tab.component';
import { PensionTabComponent } from './payer/insurance/pension-tab/pension-tab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [AuthorizationGuard],
    children: [
      {
        path: '',
        redirectTo: 'welcome-screen',
      },

      {
        path: 'customer-dashboard',
        component: RealDashboardComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['DashBoard'],
        },
      },

      {
        path: 'open-biller-admin',
        component: OpenBillerAdminComponent,
        canActivate: [AuthGuardService],
      },

      {
        path: 'view-my-accounts',
        component: ViewAccountsComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['maintain Account(s)'],
        },
      },

      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuardService],
      },

      {
        path: 'generated-e-slip',
        component: GeneratedESlipComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['E-slips Generated'],
        },
      },

      {
        path: 'view-policies',
        component: PoliciesComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['E-slips Generated'],
        },
      },

      {
        path: 'report-details',
        component: ReportDetailComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['Reports'],
        },
      },
      {
        path: 'payer-report',
        component: ReportsComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['Reports'],
        },
      },
      {
        path: 'report-history',
        component: ReportHistoryComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['Reports'],
        },
      },
      // ReceiptComponent
      {
        path: 'eslip-receipt',
        component: ReceiptComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['E-slips Generated'],
        },
      },
      {
        path: 'eslip-accounts',
        component: InvoiceAccountsComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['E-slips Generated'],
        },
      },
      {
        path: 'account-eslips',
        component: EslipAccountsComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['E-slips Generated'],
        },
      },
      {
        path: 'account-report-summary',
        component: AccountReportsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Reports'],
        },
      },
      {
        path: 'rejected-accounts',
        component: RejectedFilesComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['maintain Account(s)'],
        },
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate: [AuthGuardService],
      },

      {
        path: 'uploaded-file-summary',
        component: UploadedFileSummaryComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['maintain Account(s)'],
        },
      },
      {
        path: 'uploaded-payment-summary',
        component: UploadedPaymentSummaryComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },

      {
        path: 'insurance',
        component: PolicyTabComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },
      {
        path: 'pensions',
        component: PensionTabComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },
      {
        path: 'eslip-accounts',
        component: InvoiceAccountsComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },
      {
        path: 'eslip-info',
        component: ElsipInfoComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },
      {
        path: 'eslip-bills',
        component: EslipBillsComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },
      {
        path: 'my-team',

        component: MyteamComponent,
        canActivate: [AuthGuardService],
        data: {
          allowedRoles: ['My Team'],
        },
      },
      {
        path: 'new-member',
        component: CreateMemberComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'uploaded-file-details',
        component: UploadedFileDetailsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['maintain Account(s)'],
        },
      },
    ],
  },

  {
    path: 'view-billers',
    component: ViewBillersComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'printview',
    component: ViewInvoiceComponent,
  },
  {
    path: 'view-invoice',
    component: InvoiceComponent,
  },
  {
    path: 'uploaded-payment-details',
    component: UploadedPaymentDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-roles',
    component: UserRolesComponent,
    canActivate: [AuthGuardService, AuthorizationGuard],
    data: {
      allowedRoles: ['My Team'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainAppRoutingModule {}
