import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './bank-dashboard/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RegisteruserComponent } from './myteam/registeruser/registeruser.component';
import { UserGroupsComponent } from './myteam/user-groups/user-groups.component';
import { EditMemberComponent } from './myteam/edit-member/edit-member.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ViewAccountsComponent } from './accounts/view-accounts/view-accounts.component';
import { ActiveUsersComponent } from './myteam/active-users/active-users.component';
import { UnauthorisedUsersComponent } from './myteam/unauthorised-users/unauthorised-users.component';
import { AddAccountsComponent } from './accounts/add-accounts/add-accounts.component';
import { SingleAccountsComponent } from './accounts/single-accounts/single-accounts.component';
import { MultipleAccountsComponent } from './accounts/multiple-accounts/multiple-accounts.component';
import { UploadedFileSummaryComponent } from './accounts/uploaded-file-summary/uploaded-file-summary.component';
import { UploadedFileDetailsComponent } from './accounts/uploaded-file-details/uploaded-file-details.component';
import { ConfirmEslipGenerationComponent } from './accounts/confirm-eslip-generation/confirm-eslip-generation.component';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import { BillerWizardComponent } from './billers/biller-wizard/biller-wizard.component';
import { InvitedUsersComponent } from './myteam/invited-users/invited-users.component';
import { ServiceChargeComponent } from './service-charge/service-charge.component';
import { ToastrModule } from 'ngx-toastr';
import { PaidChargeComponent } from './service-charge/paid-charge/paid-charge.component';
import { PendingChargeComponent } from './service-charge/pending-charge/pending-charge.component';
import { ConfirmApprovalComponent } from './service-charge/confirm-approval/confirm-approval.component';
import { AddCountryComponent } from './bank-settings/country/add-country/add-country.component';
import { AddBranchComponent } from './bank-settings/branch/add-branch/add-branch.component';
import { BranchListComponent } from './bank-settings/branch/branch-list/branch-list.component';
import { RedirectGuardService } from '../core/guards/redirect-guard.service';
import { EditBillerComponent } from './billers/edit-biller/edit-biller.component';
import { AlertsComponent } from './misc/logs/alerts/alerts.component';
import { AuthorizationService } from './misc/authorization/authorization.service';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { ExceptionDetailsComponent } from './exceptions/exception-details/exception-details.component';
import { ExceptionsListComponent } from './exceptions/exceptions-list/exceptions-list.component';
import { ApprovalModalComponent } from './exceptions/approval-modal/approval-modal.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { UpdateTeamComponent } from './myteam/update-team/update-team.component';
import { SearchPayerPipe } from '../core/pipes/search-payer/search-payer.pipe';
import { ChargePipePipe } from '../core/pipes/charge-pipe/charge-pipe.pipe';
import { EslipSearchPipe } from '../core/pipes/eslip-search/eslip-search.pipe';
import { AccountSearchPipe } from '../core/pipes/account-search/account-search.pipe';
import { EslipAcPipe } from '../core/pipes/eslip-ac/eslip-ac.pipe';
import { RejectedSearchPipe } from '../core/pipes/rejected-search/rejected-search.pipe';
import { TeamSearchPipe } from '../core/pipes/team-search/team-search.pipe';
import { FileAcPipe } from '../core/pipes/file-ac/file-ac.pipe';
import { BillerSearchPipe } from '../core/pipes/biller-search/biller-search.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ESlipsComponent } from './eslips/pay-on-behalf/e-slips/e-slips.component';
import { PayOnBehalfComponent } from './eslips/pay-on-behalf/pay-on-behalf.component';
import { UploadPaymentFileDialogComponent } from './eslips/pay-on-behalf/upload-payment-file-dialog/upload-payment-file-dialog.component';
import { UploadedPaymentSummaryComponent } from './eslips/pay-on-behalf/upload-payment-file-dialog/uploaded-payment-summary/uploaded-payment-summary.component';
import { PaymentsComponent } from './eslips/pay-on-behalf/payments/payments.component';
import { PendingEslipsComponent } from './eslips/pay-on-behalf/pending-eslips/pending-eslips.component';
import { PaidEslipsComponent } from './eslips/pay-on-behalf/paid-eslips/paid-eslips.component';
import { ExpiredEslipsComponent } from './eslips/pay-on-behalf/expired-eslips/expired-eslips.component';
import { EslipAccountsComponent } from './eslips/pay-on-behalf/e-slips/eslip-accounts/eslip-accounts.component';
import { ConfirmEslipComponent } from './eslips/pay-on-behalf/confirm-eslip/confirm-eslip.component';
import { PayEslipComponent } from './eslips/pay-on-behalf/pay-eslip/pay-eslip.component';
import { ReceiptComponent } from './eslips/pay-on-behalf/receipt/receipt.component';
import { RejectedFilesComponent } from './misc/rejected-files/rejected-files.component';
import { AlertsPipe } from '../core/pipes/alerts-pipe/alerts.pipe';
import { AlertSearchPipe } from '../core/pipes/alert-search/alert-search.pipe';
import { BranchSearchPipe } from '../core/pipes/branch-search/branch-search.pipe';
import { AlertsPipePipe } from '../core/pipes/alerts-pipe-pipe/alerts-pipe.pipe';
import { AccountService } from '../core/services/accounts/account.service';
import { BoardingStepsService } from '../core/services/boarding-service/boarding.service';
import { CountryBranchService } from '../core/services/country-branch/country-branch.service';
import { DashboardService } from '../core/services/dashboard/dashboard.service';
import { OnboardingService } from '../core/services/onboarding/onboarding.service';
import { EslipsService } from '../core/services/eslips/eslips.service';
import { TeamsServiceService } from './myteam/teams-service.service';
import { BillersService } from '../core/services/billers/billers.service';
import { ExcelDataService } from '../core/services/excel/excel-data.service';
import { ClosedBillerComponent } from './billers/closed-biller/closed-biller.component';
import { ReportSearchPipe } from '../core/pipes/report-search/report-search.pipe';
import { ApprovePaymentComponent } from './eslips/pay-on-behalf/approve-payment/approve-payment.component';
import { FailedEslipsComponent } from './exceptions/failed-eslips/failed-eslips.component';
import { FailedAccountsComponent } from './eslips/pay-on-behalf/e-slips/failed-accounts/failed-accounts.component';
import { FailedAccountsPipe } from '../core/pipes/failed-accounts/failed-accounts.pipe';
import { CountryListComponent } from './bank-settings/country/country-list/country-list.component';
import { SystemLogsComponent } from './misc/logs/system-logs/system-logs.component';
import { LogsComponent } from './misc/logs/logs.component';
import { HttpErrorInterceptor } from '../core/interceptors/error.interceptor';
import { TokenInterceptor } from '../core/interceptors/TokenInterceptor';
import { AuthInterceptor } from '../core/interceptors/access-token.interceptor';
import { ApproveDeletedComponent } from './myteam/approve-deleted/approve-deleted.component';
import { ApproveEditedComponent } from './myteam/approve-edited/approve-edited.component';
import { UpdateCountryComponent } from './misc/update-country/update-country.component';
import { UpdateBranchComponent } from './misc/update-branch/update-branch.component';
import { ApproveNewGroupComponent } from './myteam/user-groups/approve-new-group/approve-new-group.component';
import { ApproveDeletedGroupComponent } from './myteam/user-groups/approve-deleted-group/approve-deleted-group.component';
import { ConfirmListComponent } from './bank-settings/country/confirm-list/confirm-list.component';
import { ConfirmBranchComponent } from './bank-settings/branch/confirm-branch/confirm-branch.component';
import { ConfirmTeamComponent } from './myteam/confirm-team/confirm-team.component';
import { UserGroupListComponent } from './myteam/user-group-list/user-group-list.component';
import { UserGroupDeleteComponent } from './myteam/user-group-list/user-group-delete/user-group-delete.component';
import { GroupSearchPipe } from '../core/pipes/group-search/group-search.pipe';
import { ApproveEditBillerComponent } from './billers/approve-edit-biller/approve-edit-biller.component';
import { ApproveEditGroupComponent } from './myteam/user-groups/approve-edit-group/approve-edit-group.component';
import { ConfirmDeleteBillerComponent } from './billers/confirm-delete-biller/confirm-delete-biller.component';
import { ApprovedDeletedBillersComponent } from './billers/approved-deleted-billers/approved-deleted-billers.component';
import { RejectNewBillerComponent } from './billers/reject-new-biller/reject-new-biller.component';
import { RejectEditedBillerComponent } from './billers/reject-edited-biller/reject-edited-biller.component';
import { RejectDeleteBillerComponent } from './billers/reject-delete-biller/reject-delete-biller.component';
import { RejectedEditedUserComponent } from './myteam/rejected-edited-user/rejected-edited-user.component';
import { RejectedDeletedUserComponent } from './myteam/rejected-deleted-user/rejected-deleted-user.component';
import { RejectedCreatedUserComponent } from './myteam/rejected-created-user/rejected-created-user.component';
import { RejectCreatedGroupComponent } from './myteam/user-groups/reject-created-group/reject-created-group.component';
import { RejectEditedGroupComponent } from './myteam/user-groups/reject-edited-group/reject-edited-group.component';
import { RejectDeletedGroupComponent } from './myteam/user-groups/reject-deleted-group/reject-deleted-group.component';
import { ApproveEditBillerModalComponent } from './billers/approve-edit-biller-modal/approve-edit-biller-modal.component';
import { ApproveDeletedBillerModalComponent } from './billers/approve-deleted-biller-modal/approve-deleted-biller-modal.component';
import { ApproveBillerModalComponent } from './billers/approve-biller-modal/approve-biller-modal.component';
import { ApproveBankUserModalComponent } from './myteam/approve-bank-user-modal/approve-bank-user-modal.component';
import { ApproveEditedBankUserModalComponent } from './myteam/approve-edited-bank-user-modal/approve-edited-bank-user-modal.component';
import { ApproveDeletedBankUserModalComponent } from './myteam/approve-deleted-bank-user-modal/approve-deleted-bank-user-modal.component';
import { ApproveNewGroupModalComponent } from './myteam/approve-new-group-modal/approve-new-group-modal.component';
import { ApproveCreatedGroupModalComponent } from './myteam/approve-created-group-modal/approve-created-group-modal.component';
import { ApproveEditedGroupModalComponent } from './myteam/approve-edited-group-modal/approve-edited-group-modal.component';
import { ApproveDeletedGroupModalComponent } from './myteam/approve-deleted-group-modal/approve-deleted-group-modal.component';
import { IgnoreExceptionsModalComponent } from './exceptions/ignore-exceptions-modal/ignore-exceptions-modal.component';
import { ApprovePaymentModalComponent } from './exceptions/approve-payment-modal/approve-payment-modal.component';
import { UserGroupTabComponent } from './myteam/user-group-tab/user-group-tab.component';
import { RejectEslipModalComponent } from './exceptions/reject-eslip-modal/reject-eslip-modal.component';
import { RejectedEslipsComponent } from './exceptions/rejected-eslips/rejected-eslips.component';
import { IgnoredExceptionsComponent } from './exceptions/ignored-exceptions/ignored-exceptions.component';
import { ModalIgonreExceptionsComponent } from './exceptions/modal-igonre-exceptions/modal-igonre-exceptions.component';
import { PendingChargeDetailsComponent } from './service-charge/pending-charge-details/pending-charge-details.component';
import { PaidChargeDetailsComponent } from './service-charge/paid-charge-details/paid-charge-details.component';
import { ChargeMonthPipe } from '../core/pipes/charge-month/charge-month.pipe';
import { ConfirmServiceChargeApprovalComponent } from './service-charge/confirm-service-charge-approval/confirm-service-charge-approval.component';
import { ReportHistoryComponent } from './reports/report-history/report-history.component';
import { ReportHistoryDetailsComponent } from './reports/report-history-details/report-history-details.component';
import { DetailReportPipe } from '../core/pipes/detail-report/detail-report.pipe';
import { BillerTeamMembersComponent } from './billers/active-billers/biller-team-members/biller-team-members.component';
import { AddTeamMemberComponent } from './billers/active-billers/biller-team-members/add-team-member/add-team-member.component';
import { PayerTeamComponent } from './payers/payer-team/payer-team.component';
import { PayerMemberComponent } from './payers/payer-team/payer-member/payer-member.component';
import { BillerTeamPipe } from '../core/pipes/biller/payer-team-search/biller.pipe';
import { CountrySearchPipe } from '../core/pipes/country-search/country-search.pipe';
import { HistoryReportsPipe } from '../core/pipes/history-reports/history-reports.pipe';
import { CustomValidatorsComponent } from './home-page/custom-validators/custom-validators.component';
// ApproveDeletedGroupComponent
import { BankSettingsComponent } from './bank-settings/bank-settings.component';
import { SectorsComponent } from './bank-settings/sector-settings/sectors/sectors.component';
import { AddSectorsComponent } from './bank-settings/sector-settings/add-sectors/add-sectors.component';
import { SectorSearchPipe } from '../core/pipes/sector-search/sector-search.pipe';
import { ConfirmDeleteComponent } from './bank-settings/sector-settings/confirm-delete/confirm-delete.component';

import { CompanyDetailsComponent } from './billers/closed-biller/company-details/company-details.component';
import { AdminDetailsComponent } from './billers/closed-biller/admin-details/admin-details.component';
import { BillingLinesComponent } from './billers/closed-biller/billing-lines/billing-lines.component';
import { UploadSectorsComponent } from './bank-settings/sector-settings/sectors/upload-sectors/upload-sectors.component';
import { UploadBranchesComponent } from './bank-settings/branch/upload-branches/upload-branches.component';
import { UploadSectorComponent } from './bank-settings/sector-settings/upload-sector/upload-sector.component';
import { UploadCountriesComponent } from './bank-settings/country/upload-countries/upload-countries.component';
// ApproveDeletedGroupComponent
@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [
    ApprovePaymentComponent,
    FailedAccountsComponent,
    DashboardComponent,
    ESlipsComponent,
    VerifyComponent,
    AdminHomeComponent,
    ActiveBillersComponent,
    PendingBillersComponent,
    InvitedBillersComponent,
    PayersComponent,
    ReportsComponent,
    BillerProfileComponent,
    PayerProfileComponent,
    BillersComponent,
    MyteamComponent,
    RegisteruserComponent,
    UserGroupsComponent,
    EditMemberComponent,
    PayOnBehalfComponent,
    UploadPaymentFileDialogComponent,
    UploadPaymentFileDialogComponent,
    UploadedPaymentSummaryComponent,
    ViewAccountsComponent,
    ActiveUsersComponent,
    UnauthorisedUsersComponent,
    PaymentsComponent,
    PendingEslipsComponent,
    PaidEslipsComponent,
    ExpiredEslipsComponent,
    RejectedFilesComponent,
    AddAccountsComponent,
    SingleAccountsComponent,
    MultipleAccountsComponent,
    UploadedFileSummaryComponent,
    UploadedFileDetailsComponent,
    ConfirmEslipGenerationComponent,
    EslipAccountsComponent,
    ConfirmEslipComponent,
    BillerWizardComponent,
    InvitedUsersComponent,
    ServiceChargeComponent,
    PaidChargeComponent,
    PendingChargeComponent,
    ConfirmApprovalComponent,
    AddCountryComponent,
    AddBranchComponent,
    BranchListComponent,
    EditBillerComponent,
    AlertsComponent,
    ExceptionsComponent,
    ExceptionDetailsComponent,
    PayEslipComponent,
    ReceiptComponent,
    ExceptionsListComponent,
    ApprovalModalComponent,
    UpdateTeamComponent,
    SearchPayerPipe,
    ChargePipePipe,
    EslipSearchPipe,
    AccountSearchPipe,
    EslipAcPipe,
    AlertsPipePipe,
    RejectedSearchPipe,
    TeamSearchPipe,
    FileAcPipe,
    BillerSearchPipe,
    AlertsPipe,
    AlertSearchPipe,
    BranchSearchPipe,
    ClosedBillerComponent,
    ReportSearchPipe,
    FailedEslipsComponent,
    FailedEslipsComponent,
    FailedAccountsPipe,
    CountryListComponent,
    CountrySearchPipe,
    SystemLogsComponent,
    LogsComponent,
    ApproveDeletedComponent,
    ApproveEditedComponent,
    UpdateCountryComponent,
    UpdateBranchComponent,
    ConfirmListComponent,
    ConfirmBranchComponent,
    ConfirmTeamComponent,
    ApproveNewGroupComponent,
    ApproveDeletedGroupComponent,
    UserGroupListComponent,
    UserGroupDeleteComponent,
    GroupSearchPipe,
    ApproveEditBillerComponent,
    ApproveDeletedGroupComponent,
    ApproveNewGroupComponent,
    ApproveEditGroupComponent,
    ConfirmDeleteBillerComponent,
    ApprovedDeletedBillersComponent,
    RejectNewBillerComponent,
    RejectEditedBillerComponent,
    RejectDeleteBillerComponent,
    RejectedEditedUserComponent,
    RejectedDeletedUserComponent,
    RejectedCreatedUserComponent,
    RejectCreatedGroupComponent,
    RejectEditedGroupComponent,
    RejectDeletedGroupComponent,
    ApproveEditBillerModalComponent,
    ApproveDeletedBillerModalComponent,
    ApproveBillerModalComponent,
    ApproveBankUserModalComponent,
    ApproveEditedBankUserModalComponent,
    ApproveDeletedBankUserModalComponent,
    ApproveNewGroupModalComponent,
    ApproveCreatedGroupModalComponent,
    ApproveEditedGroupModalComponent,
    ApproveDeletedGroupModalComponent,
    IgnoreExceptionsModalComponent,
    ApprovePaymentModalComponent,
    UserGroupTabComponent,
    RejectEslipModalComponent,
    RejectedEslipsComponent,
    IgnoredExceptionsComponent,
    ModalIgonreExceptionsComponent,
    PendingChargeDetailsComponent,
    PaidChargeDetailsComponent,
    ChargeMonthPipe,
    ConfirmServiceChargeApprovalComponent,
    ReportHistoryComponent,
    ReportHistoryDetailsComponent,
    HistoryReportsPipe,
    DetailReportPipe,
    BillerTeamMembersComponent,
    AddTeamMemberComponent,
    PayerTeamComponent,
    PayerMemberComponent,
    BillerTeamPipe,
    CustomValidatorsComponent,
    BankSettingsComponent,
    SectorsComponent,
    AddSectorsComponent,
    SectorSearchPipe,
    ConfirmDeleteComponent,
    CompanyDetailsComponent,
    AdminDetailsComponent,
    BillingLinesComponent,
    UploadSectorsComponent,
    UploadBranchesComponent,
    UploadSectorComponent,
    UploadCountriesComponent,

  ],
  providers: [
    AccountService,
    CountryBranchService,
    BoardingStepsService,
    DashboardService,
    OnboardingService,
    BillersService,
    TeamsServiceService,
    NgxBarcodeModule,
    ExcelDataService,
    EslipsService,
    AuthGuardService,
    RedirectGuardService,
    AuthGuardService,
    AuthorizationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],

  imports: [
    PdfViewerModule,
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ArchwizardModule,
    Ng2TelInputModule,
    NgxBarcodeModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgxChartsModule,
    NgZorroAntdModule,
    ScrollingModule
  ],
  entryComponents: [
    UploadSectorsComponent,
    ConfirmServiceChargeApprovalComponent,
    RejectEslipModalComponent,
    ModalIgonreExceptionsComponent,
    RejectNewBillerComponent,
    RejectEditedBillerComponent,
    RejectDeleteBillerComponent,
    UpdateBranchComponent,
    UpdateCountryComponent,
    VerifyComponent,
    UpdateTeamComponent,

    RegisteruserComponent,
    EditMemberComponent,
    AddAccountsComponent,
    UploadPaymentFileDialogComponent,
    ConfirmEslipGenerationComponent,
    ConfirmEslipComponent,
    ConfirmApprovalComponent,
    ApprovalModalComponent,
    AddCountryComponent,
    AddBranchComponent,
    EditBillerComponent,
    PayEslipComponent,
    ConfirmListComponent,
    ConfirmBranchComponent,
    ConfirmTeamComponent,
    UserGroupDeleteComponent,
    UserGroupsComponent,
    ConfirmDeleteBillerComponent,
    RejectedEditedUserComponent,
    RejectedDeletedUserComponent,
    RejectedCreatedUserComponent,
    RejectCreatedGroupComponent,
    RejectEditedGroupComponent,
    RejectDeletedGroupComponent,
    ApproveEditBillerModalComponent,
    ApproveDeletedBillerModalComponent,
    ApproveBillerModalComponent,
    ApproveBankUserModalComponent,
    ApproveEditedBankUserModalComponent,
    ApproveDeletedBankUserModalComponent,
    ApproveCreatedGroupModalComponent,
    ApproveEditedGroupModalComponent,
    ApproveDeletedGroupModalComponent,
    IgnoreExceptionsModalComponent,
    ApprovePaymentModalComponent,
    ReportHistoryComponent,
    ReportHistoryDetailsComponent,
    AddTeamMemberComponent,
    PayerMemberComponent,
    PayerTeamComponent
  ]
})
export class DashboardModule {}
