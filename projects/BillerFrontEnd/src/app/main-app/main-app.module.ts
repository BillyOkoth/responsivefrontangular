import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './payer/payer-dashboard/dashboard/dashboard.component';

import { RealDashboardComponent } from './payer/payer-dashboard/real-dashboard/real-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenBillerAdminComponent } from './payer/maintain-accounts/open-biller-admin/open-biller-admin.component';
import { ViewBillersComponent } from './payer/misc/view-billers/view-billers.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ESlipsComponent } from './payer/eslips/e-slips/e-slips.component';
import { ViewAccountsComponent } from './payer/maintain-accounts/view-accounts/view-accounts.component';
import { PaymentsComponent } from './payer/eslips/payments/payments.component';
import { GeneratedESlipComponent } from './payer/eslips/generated-e-slip/generated-e-slip.component';
import { ReportsComponent } from './payer/reports/reports.component';
import { UploadedFileSummaryComponent } from './payer/maintain-accounts/uploaded-file-summary/uploaded-file-summary.component';
import { UploadedFileDetailsComponent } from './payer/maintain-accounts/uploaded-file-details/uploaded-file-details.component';
import { UploadPaymentFileDialogComponent } from './payer/eslips/upload-payment-file-dialog/upload-payment-file-dialog.component';
import { MyteamComponent } from './payer/my-team/myteam/myteam.component';
import { CreateMemberComponent } from './payer/my-team/myteam/create-member/create-member.component';

import { UserRolesComponent } from './payer/my-team/user-roles/user-roles.component';
import { FAQsComponent } from './payer/misc/faqs/faqs.component';
import { UpgradeToBillerComponent } from './upgrade-to-biller/upgrade-to-biller.component';

// tslint:disable-next-line: max-line-length
import { UploadedPaymentSummaryComponent } from './payer/eslips/upload-payment-file-dialog/uploaded-payment-summary/uploaded-payment-summary.component';
import { UploadedPaymentDetailsComponent } from './payer/eslips/upload-payment-file-dialog/uploaded-payment-details/uploaded-payment-details.component';
import { SingleAccountComponent } from './payer/maintain-accounts/open-biller-admin/single-account/single-account.component';
import { MultipleAccountsComponent } from './payer/maintain-accounts/open-biller-admin/multiple-accounts/multiple-accounts.component';
import { ConfirmEslipGenerationComponent } from './payer/eslips/payments/confirm-eslip-generation/confirm-eslip-generation.component';
import { PendingEslipsComponent } from './payer/eslips/generated-e-slip/pending-eslips/pending-eslips.component';
import { PaidEslipsComponent } from './payer/eslips/generated-e-slip/paid-eslips/paid-eslips.component';

import { ExpiredEslipsComponent } from './payer/eslips/generated-e-slip/expired-eslips/expired-eslips.component';
import { RejectedFilesComponent } from './payer/eslips/payments/rejected-files/rejected-files.component';
import { ConfirmEslipComponent } from './payer/eslips/payments/confirm-eslip/confirm-eslip.component';

import { AccountReportsComponent } from './payer/reports/account-report-summary/account-reports/account-reports.component';
import { MyProfileComponent } from './payer/misc/my-profile/my-profile.component';
import { AccountReportSummaryComponent } from './payer/reports/account-report-summary/account-report-summary.component';

import { ConfirmDeletionComponent } from './payer/maintain-accounts/view-accounts/confirm-deletion/confirm-deletion.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { SearchPipe } from './pipes/search/search.pipe';
import { SearchEslipPipe } from './pipes/search-eslip/search-eslip.pipe';
import { PolicySearchPipe } from './pipes/policy-search.pipe';
import { TeamSearchPipe } from './pipes/team-seach/team-search.pipe';
import { SearchRejectedPipe } from './pipes/search-rejected/search-rejected.pipe';
import { ReceiptComponent } from './payer/eslips/payments/receipt/receipt.component';
import { SearchFilePipe } from './pipes/search-file/search-file.pipe';
import { UpdateTeamComponent } from './payer/my-team/myteam/update-team/update-team.component';

import { ReportHistoryComponent } from './payer/reports/report-history/report-history.component';
import { SearchReportsPipe } from './pipes/search-reports/search-reports.pipe';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ReportDetailComponent } from './payer/reports/report-detail/report-detail.component';
import { HistorySearchPipe } from './pipes/history-search/history-search.pipe';
import { DetailSearchPipe } from './pipes/detail-search/detail-search.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ConfirmLogoutComponent } from './payer/payer-dashboard/dashboard/confirm-logout/confirm-logout.component';
import { EslipAccountsComponent } from './payer/eslips/eslip-accounts/eslip-accounts.component';
import { InvoicesComponent } from './payer/invoices/invoices.component';
import { PaidInvoicesComponent } from './payer/invoices/paid-invoices/paid-invoices.component';
import { OutstandingInvoicesComponent } from './payer/invoices/outstanding-invoices/outstanding-invoices.component';
import { DisputedInvoicesComponent } from './payer/invoices/disputed-invoices/disputed-invoices.component';
import { InvoiceSearchPipe } from './pipes/invoice-search.pipe';
import { InvoiceEslipsComponent } from './payer/invoices/invoice-eslips/invoice-eslips.component';
import { ElsipInfoComponent } from './payer/invoices/elsip-info/elsip-info.component';
import { EslipBillsComponent } from './payer/invoices/eslip-bills/eslip-bills.component';
import { InvoiceAccountsComponent } from './payer/invoices/invoice-accounts/invoice-accounts.component';
import { InvoiceEslipSearchPipe } from './pipes/invoice-eslip-search.pipe';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { ViewInvoiceComponent } from '../biller/invoices/view-invoice/view-invoice.component';
import { DisputeInvoiceModalComponent } from './payer/invoices/disputed-invoices/dispute-invoice-modal/dispute-invoice-modal.component';
import { InvoiceComponent } from './payer/invoice/invoice.component';
import { InvoicePerServiceComponent } from './payer/invoices/outstanding-invoices/invoice-per-service/invoice-per-service.component';
import { PoliciesComponent } from './payer/policies/policies.component';
import { GeneratedPoliciesComponent } from './payer/policies/generated-policies/generated-policies.component';
import { ConfirmInvoiceEslipComponent } from './payer/invoices/outstanding-invoices/invoice-per-service/confirm-invoice-eslip/confirm-invoice-eslip.component';
import { InsuranceComponent } from './payer/insurance/insurance.component';
import { InsurancePayerMapComponent } from './payer/insurance/insurance-payer-map/insurance-payer-map.component';
import { UploadMapPayerComponent } from './payer/insurance/upload-map-payer/upload-map-payer.component';
import { PayerInsuranceMappingComponent } from './payer/insurance/payer-insurance-mapping/payer-insurance-mapping.component';
import { PayerUploadTabComponent } from './payer/insurance/payer-upload-tab/payer-upload-tab.component';
import { UploadPayerInsuranceComponent } from './payer/insurance/upload-payer-insurance/upload-payer-insurance.component';
import { ConfirmPayerInsuranceUploadComponent } from './payer/insurance/confirm-payer-insurance-upload/confirm-payer-insurance-upload.component';
import { UmbrellaFundPolicyComponent } from './payer/insurance/umbrella-fund-policy/umbrella-fund-policy.component';
import { PayerPoliciesComponent } from './payer/insurance/payer-policies/payer-policies.component';
import { PolicyTabComponent } from './payer/insurance/policy-tab/policy-tab.component';
import { OutstandingPoliciesComponent } from './payer/insurance/outstanding-policies/outstanding-policies.component';
import { ConfirmEslipPolicyComponent } from './payer/insurance/outstanding-policies/confirm-eslip-policy/confirm-eslip-policy.component';
import { ViewPolicyFileModalComponent } from './payer/insurance/outstanding-policies/view-policy-file-modal/view-policy-file-modal.component';
import { PolicyFileSearchPipe } from './payer/insurance/outstanding-policies/policy-file-search.pipe';
import { OutstandingPolicySearchPipe } from './payer/insurance/outstanding-policies/outstanding-policy-search.pipe';
import { PensionComponent } from './payer/insurance/pension/pension.component';
import { CheckOffPolicesComponent } from './payer/insurance/check-off-polices/check-off-polices.component';
import { CheckOffPolicySearchPipe } from './payer/insurance/outstanding-policies/check-off-policy-search.pipe';
import { UploadedPensionFilesComponent } from './payer/insurance/uploaded-pension-files/uploaded-pension-files.component';
import { PensionTabComponent } from './payer/insurance/pension-tab/pension-tab.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { PensionConfirmDialogComponent } from './payer/insurance/umbrella-fund-policy/pension-confirm-dialog/pension-confirm-dialog.component';
import { CheckOffUploadDialogComponent } from './payer/insurance/upload-payer-insurance/check-off-upload-dialog/check-off-upload-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RealDashboardComponent,
    OpenBillerAdminComponent,
    ViewBillersComponent,
    ESlipsComponent,
    ViewAccountsComponent,
    PaymentsComponent,
    GeneratedESlipComponent,
    ReportsComponent,
    UploadedFileSummaryComponent,
    UploadedFileDetailsComponent,
    UploadPaymentFileDialogComponent,
    MyteamComponent,
    CreateMemberComponent,
    UserRolesComponent,
    FAQsComponent,
    UpgradeToBillerComponent,
    EslipAccountsComponent,
    UploadedPaymentSummaryComponent,
    UploadedPaymentDetailsComponent,
    SingleAccountComponent,
    MultipleAccountsComponent,
    ViewInvoiceComponent,
    ConfirmEslipGenerationComponent,
    PendingEslipsComponent,
    PaidEslipsComponent,
    ExpiredEslipsComponent,
    RejectedFilesComponent,
    ConfirmEslipComponent,
    ExpiredEslipsComponent,
    AccountReportsComponent,
    MyProfileComponent,
    AccountReportSummaryComponent,
    ConfirmDeletionComponent,
    SearchPipe,
    SearchEslipPipe,
    TeamSearchPipe,
    SearchRejectedPipe,
    PolicySearchPipe,
    ReceiptComponent,
    SearchFilePipe,
    UpdateTeamComponent,
    ReportHistoryComponent,
    SearchReportsPipe,
    ReportDetailComponent,
    HistorySearchPipe,
    DetailSearchPipe,
    InvoicesComponent,
    PaidInvoicesComponent,
    OutstandingInvoicesComponent,
    DisputedInvoicesComponent,
    ConfirmLogoutComponent,
    InvoiceSearchPipe,
    InvoiceEslipsComponent,
    ElsipInfoComponent,
    EslipBillsComponent,
    InvoiceAccountsComponent,
    InvoiceEslipSearchPipe,
    DisputeInvoiceModalComponent,
    InvoiceComponent,
    InvoicePerServiceComponent,
    PoliciesComponent,
    GeneratedPoliciesComponent,
    ConfirmInvoiceEslipComponent,
    InsuranceComponent,

    InsurancePayerMapComponent,
    UploadMapPayerComponent,
    PayerInsuranceMappingComponent,
    PayerUploadTabComponent,
    UploadPayerInsuranceComponent,
    ConfirmPayerInsuranceUploadComponent,
    UmbrellaFundPolicyComponent,
    PayerPoliciesComponent,

    PolicyTabComponent,
    OutstandingPoliciesComponent,
    ConfirmEslipPolicyComponent,
    ViewPolicyFileModalComponent,
    PolicyFileSearchPipe,
    OutstandingPolicySearchPipe,
    PensionComponent,
    CheckOffPolicesComponent,
    CheckOffPolicySearchPipe,
    UploadedPensionFilesComponent,
    PensionTabComponent,
    AccountReportsComponent,
    PolicyFileSearchPipe,
    OutstandingPolicySearchPipe, PensionComponent, CheckOffPolicesComponent, PensionConfirmDialogComponent, CheckOffUploadDialogComponent,


  ],

  imports: [
    CommonModule,
    NgZorroAntdModule,
    MainAppRoutingModule,
    ColorPickerModule,
    NgxChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    ScrollingModule,
    OverlayModule,
    PdfViewerModule,
    NgxBarcodeModule
  ],
  providers: [

    { provide: NZ_I18N, useValue: en_US },
  ],
  entryComponents: [
    CheckOffUploadDialogComponent,
    PensionConfirmDialogComponent,
    EslipAccountsComponent,
    ViewPolicyFileModalComponent,
    ConfirmEslipPolicyComponent,
    PayerInsuranceMappingComponent,
    UmbrellaFundPolicyComponent,
    ConfirmPayerInsuranceUploadComponent,
    PayerUploadTabComponent,
    InsurancePayerMapComponent,
    ConfirmInvoiceEslipComponent,
    ConfirmEslipComponent,
    ViewAccountsComponent,
    CreateMemberComponent,
    UploadPaymentFileDialogComponent,
    FAQsComponent,
    UpgradeToBillerComponent,
    ConfirmEslipGenerationComponent,
    ConfirmDeletionComponent,
    UpdateTeamComponent,
    ConfirmLogoutComponent,
    DisputeInvoiceModalComponent,
    InvoicePerServiceComponent,
  ],
})
export class MainAppModule { }
