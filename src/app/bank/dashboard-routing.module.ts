import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './bank-dashboard/dashboard/dashboard.component';
import { VerifyComponent } from './misc/verify/verify.component';
import { AdminHomeComponent } from './bank-dashboard/admin-home/admin-home.component';
import { ActiveBillersComponent } from './billers/active-billers/active-billers.component';
import { PendingBillersComponent } from './billers/pending-billers/pending-billers.component';
import { InvitedBillersComponent } from './billers/invited-billers/invited-billers.component';
import { PayersComponent } from './payers/payers.component';
import { ReportsComponent } from './reports/reports.component';
import { BillerProfileComponent } from './billers/biller-profile/biller-profile.component';
import { PayerProfileComponent } from './payers/payer-profile/payer-profile.component';
import { BillersComponent } from './billers/billers/billers.component';
import { MyteamComponent } from './myteam/myteam.component';
import { UserGroupsComponent } from './myteam/user-groups/user-groups.component';
import { ViewAccountsComponent } from './accounts/view-accounts/view-accounts.component';
import { UploadedFileSummaryComponent } from './accounts/uploaded-file-summary/uploaded-file-summary.component';
import { UploadedFileDetailsComponent } from './accounts/uploaded-file-details/uploaded-file-details.component';
import { RejectedFilesComponent } from './misc/rejected-files/rejected-files.component';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import { BillerWizardComponent } from './billers/biller-wizard/biller-wizard.component';
import { ServiceChargeComponent } from './service-charge/service-charge.component';
import { BranchListComponent } from './bank-settings/branch/branch-list/branch-list.component';
import { AuthorizationGuard } from './misc/authorization/authorization.guard';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { ExceptionDetailsComponent } from './exceptions/exception-details/exception-details.component';
import { PayEslipComponent } from './eslips/pay-on-behalf/pay-eslip/pay-eslip.component';
import { ReceiptComponent } from './eslips/pay-on-behalf/receipt/receipt.component';
import { EslipAccountsComponent } from './eslips/pay-on-behalf/e-slips/eslip-accounts/eslip-accounts.component';
import { UploadedPaymentSummaryComponent } from './eslips/pay-on-behalf/upload-payment-file-dialog/uploaded-payment-summary/uploaded-payment-summary.component';
import { PayOnBehalfComponent } from './eslips/pay-on-behalf/pay-on-behalf.component';
import { ClosedBillerComponent } from './billers/closed-biller/closed-biller.component';
import { FailedAccountsComponent } from './eslips/pay-on-behalf/e-slips/failed-accounts/failed-accounts.component';
import { CountryListComponent } from './bank-settings/country/country-list/country-list.component';
import { LogsComponent } from './misc/logs/logs.component';
import { UserGroupTabComponent } from './myteam/user-group-tab/user-group-tab.component';
import { PendingChargeDetailsComponent } from './service-charge/pending-charge-details/pending-charge-details.component';
import { PaidChargeDetailsComponent } from './service-charge/paid-charge-details/paid-charge-details.component';
import { ReportHistoryComponent } from './reports/report-history/report-history.component';
import { ReportHistoryDetailsComponent } from './reports/report-history-details/report-history-details.component';
import { BillerTeamMembersComponent } from './billers/active-billers/biller-team-members/biller-team-members.component';
import { PayerTeamComponent } from './payers/payer-team/payer-team.component';
import { BankSettingsComponent } from './bank-settings/bank-settings.component';
import { CompanyDetailsComponent } from './billers/closed-biller/company-details/company-details.component';
import { AdminDetailsComponent } from './billers/closed-biller/admin-details/admin-details.component';
import { BillingLinesComponent } from './billers/closed-biller/billing-lines/billing-lines.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthorizationGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent
      },


      {
        path: 'bank-settings',
        component: BankSettingsComponent
      },

      {
        path: 'billers',
        canActivate: [AuthGuardService, AuthorizationGuard],
        component: BillersComponent,
        data: {
          allowedRoles: ['Billers']
        },
        children: [
          {
            path: 'active-billers',
            component: ActiveBillersComponent,
            canActivate: [AuthGuardService, AuthorizationGuard]
          },
          {
            path: 'pending-billers',
            component: PendingBillersComponent,
            canActivate: [AuthGuardService, AuthorizationGuard]
          },
          {
            path: 'invited-billers',
            component: InvitedBillersComponent,
            canActivate: [AuthGuardService, AuthorizationGuard]
          }
        ]
      },
      {
        path: 'biller-team',
        component: BillerTeamMembersComponent,
        canActivate: [AuthGuardService, AuthorizationGuard]
      },
      {
        path: 'payer-team',
        component: PayerTeamComponent,
        canActivate: [AuthGuardService, AuthorizationGuard]
      },

      {
        path: 'payers',
        canActivate: [AuthGuardService, AuthorizationGuard],
        component: PayersComponent,
        data: {
          allowedRoles: ['Payers']
        }
      },

      {
        path: 'alerts',
        canActivate: [AuthGuardService, AuthorizationGuard],
        component: LogsComponent,
        data: {
          allowedRoles: ['Alerts and Logs']
        }
      },

      {
        path: 'exceptions',
        component: ExceptionsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Exceptions']
        }
      },

      {
        path: 'uploaded-file-summary',
        component: UploadedFileSummaryComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Maintain Accounts']
        }
      },

      {
        path: 'viewAccounts',
        canActivate: [AuthGuardService, AuthorizationGuard],
        component: ViewAccountsComponent,
        data: {
          allowedRoles: ['Maintain Accounts']
        }
      },

      {
        path: 'pay-eslip',
        component: PayEslipComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Eslip']
        }
      },
      {
        path: 'add-biller',
        component: BillerWizardComponent
      },
      {
        path: 'add-closed-biller',
        component: ClosedBillerComponent,
        children: [
          {
            path: '',
            component: CompanyDetailsComponent
          },
          {
            path: 'admin-details',
            component: AdminDetailsComponent
          },
          {
            path: 'billing-lines',
            component:BillingLinesComponent
          }
        ]
      },
      {
        path: 'pay-receipt',
        component: ReceiptComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'rejected-accounts',
        component: RejectedFilesComponent,
        canActivate: [AuthGuardService, AuthorizationGuard]
      },

      {
        path: 'my-team',
        canActivate: [AuthGuardService],
        component: MyteamComponent
      },

      {
        path: 'my-team',
        canActivate: [AuthGuardService],
        component: MyteamComponent
      },
      {
        path: 'my-team',
        canActivate: [AuthGuardService],
        component: MyteamComponent
      },
      {
        path: 'user-tab',
        canActivate: [AuthGuardService],
        component: UserGroupTabComponent
      },
      {
        path: 'eslip-accounts',
        component: EslipAccountsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Eslip']
        }
      },
      {
        path: 'failed-accounts',
        component: FailedAccountsComponent
      },

      {
        path: 'bank-receipt',
        component: ReceiptComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Eslip']
        }
      },

      {
        path: 'uploaded-payment-summary',
        component: UploadedPaymentSummaryComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Eslip']
        }
      },
      {
        path: 'pay-on-behalf',
        component: PayOnBehalfComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Eslip']
        }
      },

      {
        path: 'service-charge',
        component: ServiceChargeComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Service Charge']
        }
      },
      {
        path: 'pending-service-charge',
        component: PendingChargeDetailsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Service Charge']
        }
      },
      {
        path: 'paid-service-charge',
        component: PaidChargeDetailsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Service Charge']
        }
      },
      {
        path: 'exceptions',
        component: ExceptionsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Exceptions']
        }
      },
      {
        path: 'branch-list',
        component: BranchListComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: 'country-list',
        component: CountryListComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'biller-profile',
        component: BillerProfileComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Billers']
        }
      },
      {
        path: 'payer-profile',
        component: PayerProfileComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Payers']
        }
      },
      {
        path: 'uploaded-file-details',
        component: UploadedFileDetailsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Maintain Account(s)']
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Reports']
        }
      },
      {
        path: 'reports-history',
        component: ReportHistoryComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Reports']
        }
      },
      {
        path: 'reports-history-details',
        component: ReportHistoryDetailsComponent,
        canActivate: [AuthGuardService, AuthorizationGuard],
        data: {
          allowedRoles: ['Reports']
        }
      }
    ]
  },

  {
    path: 'user-groups',
    component: UserGroupsComponent,
    canActivate: [AuthGuardService, AuthorizationGuard],
    data: {
      allowedRoles: ['My Team']
    }
  },

  {
    path: 'exception-details',
    component: ExceptionDetailsComponent,
    canActivate: [AuthGuardService, AuthorizationGuard],
    data: {
      allowedRoles: ['Exceptions']
    }
  },

  { path: 'verification', component: VerifyComponent },

  {
    path: 'biller-profile',
    component: BillerProfileComponent,
    canActivate: [AuthGuardService, AuthorizationGuard],
    data: {
      allowedRoles: ['Billers']
    }
  },
  {
    path: 'payer-profile',
    component: PayerProfileComponent,
    canActivate: [AuthGuardService, AuthorizationGuard],
    data: {
      allowedRoles: ['Payers']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
