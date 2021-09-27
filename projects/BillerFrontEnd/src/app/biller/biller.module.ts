import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BillerRoutingModule } from './biller-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RealDashboardComponent } from './real-dashboard/real-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ViewPayersComponent } from './view-payers/view-payers.component';
import { GeneratedEslipComponent } from './generated-eslip/generated-eslip.component';
import { MyTeamComponent } from './teams/my-team/my-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PaidEslipsPipe } from './services/paid-eslips.pipe';
import { EslipAcPipe } from './services/eslip-ac.pipe';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SearchReportPipe } from './pipes/search-report.pipe';
import { ExceptionsPipe } from './services/exceptions.pipe';
import { ReceiptComponent } from './generated-eslip/receipt/receipt.component';
import { PayerPipe } from './services/payer.pipe';
import { ChargeEslipPipe } from './services/charge-eslip.pipe';
import { CustomizeInvoiceComponent } from './invoices/customize-invoice/customize-invoice.component';
import { BellaComponent } from './invoices/bella/bella.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { TestInvoiceComponent } from './invoices/test-invoice/test-invoice.component';
import { HistorySearchPipe } from './services/history-search.pipe';
import { DetailSearchPipe } from './services/detail-search.pipe';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';
import { BillerSettingsComponent } from './biller-settings/biller-settings.component';
import { PayerSearchPipe } from './pipes/payer-search.pipe';
import { MypayersSearchPipe } from './pipes/mypayers-search.pipe';
import { InvoiceComponent } from './dashboard/invoice/invoice.component';
import { OutstandingInvoiceComponent } from './dashboard/invoice/outstanding-invoice/outstanding-invoice.component';
import { PaidInvoiceComponent } from './dashboard/invoice/paid-invoice/paid-invoice.component';
import { DisputedInvoiceComponent } from './dashboard/invoice/disputed-invoice/disputed-invoice.component';
import { UploadedInvoicesComponent } from './dashboard/invoice/uploaded-invoices/uploaded-invoices.component';
import { UploadInvoiceComponent } from './dashboard/invoice/upload-tab/upload-invoice/upload-invoice.component';
import { UploadedInvoiceDetailsComponent } from './dashboard/invoice/uploaded-invoice-details/uploaded-invoice-details.component';
import { InvoiceSearchPipe } from './pipes/invoice-search.pipe';
import { CreateMemberComponent } from './teams/my-team/create-member/create-member.component';
import { CreatePayerComponent } from './view-payers/creating-payer/create-payer/create-payer.component';
import { MyPayersComponent } from './view-payers/payers/my-payers/my-payers.component';
import { UploadPayersComponent } from './view-payers/creating-payer/upload-payers/upload-payers.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CreatingPayerComponent } from './view-payers/creating-payer/creating-payer.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { ServiceChargeComponent } from './service-charge/service-charge.component';
import { PaidEslipsComponent } from './generated-eslip/paid-eslips/paid-eslips.component';
import { PendingEslipsComponent } from './generated-eslip/pending-eslips/pending-eslips.component';
import { EslipsAccountsComponent } from './eslips-accounts/eslips-accounts.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { PendingServiceChargeComponent } from './service-charge/pending-service-charge/pending-service-charge.component';
import { PaidServiceChargeComponent } from './service-charge/paid-service-charge/paid-service-charge.component';
import { ReportsComponent } from './reports/reports.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { ApprovalModalComponent } from './exceptions/approval-modal/approval-modal.component';
import { ExceptionsListComponent } from './exceptions/exceptions-list/exceptions-list.component';
import { PayEslipComponent } from './exceptions/pay-eslip/pay-eslip.component';
import { ApprovePaymentComponent } from './exceptions/approve-payment/approve-payment.component';
import { PayerProfileComponent } from './view-payers/payers/payer-profile/payer-profile.component';
import { MyteamSearchPipe } from './pipes/myteam-search.pipe';
import { UploadSearchPipe } from './pipes/upload-search.pipe';
import { SearchMypayersPipe } from './pipes/search-mypayers.pipe';
import { BankStatementComponent } from './bank-statement/bank-statement.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommissionSettingsComponent } from './commission-settings/commission-settings.component';
import { CurrencyManagementComponent } from './currency-management/currency-management.component';
import { SettingsComponent } from './settings/settings.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { InvoiceMappingComponent } from './dashboard/invoice/invoice-map/invoice-mapping/invoice-mapping.component';
import { IndividualInvoicesComponent } from './dashboard/invoice/individual-invoices/individual-invoices.component';
import { UploadTabComponent } from './dashboard/invoice/upload-tab/upload-tab.component';
import { PayerMapListComponent } from './view-payers/payer-map-list/payer-map-list.component';
import { PayerMapModalComponent } from './view-payers/payer-map-modal/payer-map-modal.component';
import { InvoiceMapListComponent } from './dashboard/invoice/invoice-map-list/invoice-map-list.component';
import { UploadSampleComponent } from './view-payers/payer-map-modal/upload-sample/upload-sample.component';
import { MapInvoiceComponent } from './view-payers/payer-map-modal/map-invoice/map-invoice.component';
import { CongratulationsComponent } from './welcome-screen/congratulations/congratulations.component';
import { InvoiceMapComponent } from './dashboard/invoice/invoice-map/invoice-map/invoice-map.component';
import { UploadMapInvoiceComponent } from './dashboard/invoice/invoice-map/upload-invoice/upload-map-invoice.component';
import { ServiceLineModalComponent } from './dashboard/invoice/service-line/service-line-modal/service-line-modal.component';
import { ServiceLineComponent } from './dashboard/invoice/service-line/service-line.component';
import { DeletePayerModalComponent } from './view-payers/payers/my-payers/delete-payer-modal/delete-payer-modal.component';
import { UpdateServiceLineComponent } from './dashboard/invoice/service-line/update-service-line/update-service-line.component';
import { ServiceLinePipePipe } from './service-line-pipe.pipe';
import { CommissionsPipe } from './commissions.pipe';
import { PoliciesComponent } from './liberty-journey/checkoff/policies/policies.component';
import { PolicyColumnsComponent } from './liberty-journey/checkoff/policies/policy-columns/policy-columns.component';
import { UploadPolicyExcelComponent } from './liberty-journey/checkoff/policies/policy-columns/upload-policy-excel/upload-policy-excel.component';
import { PolicyInstructionsComponent } from './liberty-journey/checkoff/policies/policy-columns/upload-policy-excel/policy-instructions/policy-instructions.component';
import { PolicyMappingComponent } from './liberty-journey/checkoff/policies/policy-columns/upload-policy-excel/policy-mapping/policy-mapping.component';
import { SetPoliciesComponent } from './liberty-journey/checkoff/policies/set-policies/set-policies.component';
import { AddPolicyComponent } from './liberty-journey/checkoff/policies/add-policy/add-policy.component';
import { SinglePolicyComponent } from './liberty-journey/checkoff/policies/add-policy/single-policy/single-policy.component';
import { MultiplePolicyComponent } from './liberty-journey/checkoff/policies/add-policy/multiple-policy/multiple-policy.component';
import { ViewPayerPolicyComponent } from './liberty-journey/checkoff/policies/view-payer-policy/view-payer-policy.component';
import { PolicyPipe } from './liberty-journey/checkoff/policies/pipes/policy.pipe';
import { PayerPoliciesComponent } from './liberty-journey/checkoff/policies/payer-policies/payer-policies.component';
import { PolicyFileDataComponent } from './liberty-journey/checkoff/policies/payer-policies/policy-file-data/policy-file-data.component';
import { UpdatePolicyComponent } from './liberty-journey/checkoff/policies/view-payer-policy/update-policy/update-policy.component';
import { InsurancePayerComponent } from './liberty-journey/policy-payer/insurance-payer/insurance-payer.component';
import { SinglePayerComponent } from './liberty-journey/policy-payer/insurance-payer/single-payer/single-payer.component';
import { MultiplePayersComponent } from './liberty-journey/policy-payer/insurance-payer/multiple-payers/multiple-payers.component';
import { PolicyPayerComponent } from './liberty-journey/policy-payer/policy-payer.component';
import { CheckoffPayerComponent } from './liberty-journey/policy-payer/checkoff-payer/checkoff-payer.component';
import { EditPayerComponent } from './liberty-journey/policy-payer/edit-payer/edit-payer.component';
import { AssignTeamComponent } from './view-payers/assign-team/assign-team.component';
import { TeamsComponent } from './teams/teams.component';
import { SalesTeamComponent } from './teams/sales-team/sales-team.component';
import { UmbrellaPayerComponent } from './liberty-journey/policy-payer/umbrella-payer/umbrella-payer.component';
import { CheckoffFileComponent } from './liberty-journey/checkoff/policies/payer-policies/policy-file-data/checkoff-file/checkoff-file.component';
import { UmbrellaFileComponent } from './liberty-journey/checkoff/policies/payer-policies/policy-file-data/umbrella-file/umbrella-file.component';
import { MultiplePayerConfirmDialogComponent } from './liberty-journey/policy-payer/insurance-payer/multiple-payers/multiple-payer-confirm-dialog/multiple-payer-confirm-dialog.component';
import { PolicyConfirmDialogComponent } from './liberty-journey/checkoff/policies/add-policy/multiple-policy/policy-confirm-dialog/policy-confirm-dialog.component';
import { GeneralInstructionsComponent } from './liberty-journey/checkoff/policies/policy-columns/general-mapping/general-instructions/general-instructions.component';
import { GeneralPolicyComponent } from './liberty-journey/checkoff/policies/policy-columns/general-mapping/general-policy/general-policy.component';
import { GeneralMappingComponent } from './liberty-journey/checkoff/policies/policy-columns/general-mapping/general-mapping.component';
import { GeneralColumnsComponent } from './liberty-journey/checkoff/policies/policy-columns/general-columns/general-columns.component';
import { UploadGeneralPolicyComponent } from './liberty-journey/checkoff/policies/policy-columns/upload-general-policy/upload-general-policy.component';
import { ConfirmUploadComponent } from './liberty-journey/checkoff/policies/policy-columns/upload-general-policy/confirm-upload/confirm-upload.component';

declare var XLSX: any;


@NgModule({
  declarations: [
    ApprovePaymentComponent,
    DashboardComponent,
    RealDashboardComponent,
    ViewPayersComponent,
    TestInvoiceComponent,
    GeneratedEslipComponent,
    MyTeamComponent,
    CreateMemberComponent,
    CreatePayerComponent,
    MyPayersComponent,
    UploadPayersComponent,
    DepartmentsComponent,
    CreatingPayerComponent,
    CreateDepartmentComponent,
    UserRolesComponent,
    ServiceChargeComponent,
    PaidEslipsComponent,
    PendingEslipsComponent,
    EslipsAccountsComponent,
    MyProfileComponent,
    WelcomeScreenComponent,
    PendingServiceChargeComponent,
    PaidServiceChargeComponent,
    ReportsComponent,
    ExceptionsComponent,
    ApprovalModalComponent,
    ExceptionsListComponent,
    PayEslipComponent,
    ApprovePaymentComponent,
    PaidEslipsPipe,
    EslipAcPipe,
    SearchReportPipe,
    ExceptionsPipe,
    ReceiptComponent,
    PayerPipe,
    ChargeEslipPipe,
    BellaComponent,
    CustomizeInvoiceComponent,
    HistorySearchPipe,
    DetailSearchPipe,
    EditDepartmentComponent,
    BillerSettingsComponent,
    PayerSearchPipe,
    MypayersSearchPipe,
    InvoiceComponent,
    OutstandingInvoiceComponent,
    PaidInvoiceComponent,
    DisputedInvoiceComponent,
    UploadedInvoicesComponent,
    UploadInvoiceComponent,
    UploadedInvoiceDetailsComponent,
    InvoiceSearchPipe,
    PayerProfileComponent,
    MyteamSearchPipe,
    UploadSearchPipe,
    SearchMypayersPipe,
    BankStatementComponent,
    CommissionSettingsComponent,
    CurrencyManagementComponent,
    SettingsComponent,
    CommissionsComponent,
    InvoiceMappingComponent,
    IndividualInvoicesComponent,
    UploadTabComponent,
    PayerMapListComponent,
    PayerMapModalComponent,
    InvoiceMapListComponent,
    UploadSampleComponent,
    MapInvoiceComponent,
    CongratulationsComponent,
    InvoiceMapComponent,
    UploadMapInvoiceComponent,
    ServiceLineModalComponent,
    ServiceLineComponent,
    DeletePayerModalComponent,
    UpdateServiceLineComponent,
    ServiceLinePipePipe,
    CommissionsPipe,
    PoliciesComponent,
    PolicyColumnsComponent,
    UploadPolicyExcelComponent,
    PolicyInstructionsComponent,
    PolicyMappingComponent,
    SetPoliciesComponent,
    AddPolicyComponent,
    SinglePolicyComponent,
    MultiplePolicyComponent,
    ViewPayerPolicyComponent,
    PolicyPipe,
    PayerPoliciesComponent,
    PolicyFileDataComponent,
    UpdatePolicyComponent,
    InsurancePayerComponent,
    SinglePayerComponent,
    MultiplePayersComponent,
    PolicyPayerComponent,
    CheckoffPayerComponent,
    EditPayerComponent,
    AssignTeamComponent,
    TeamsComponent,
    MyTeamComponent,
    SalesTeamComponent,
    UmbrellaPayerComponent,
    CheckoffFileComponent,
    UmbrellaFileComponent,
    MultiplePayerConfirmDialogComponent,
    PolicyConfirmDialogComponent,
    GeneralMappingComponent ,
    GeneralInstructionsComponent,
    GeneralPolicyComponent,
    GeneralColumnsComponent,
    UploadGeneralPolicyComponent,
    ConfirmUploadComponent
  ],
  imports: [
    BillerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgxChartsModule,
    ColorPickerModule,
    OverlayModule,
    NzModalModule,
    NgZorroAntdModule,
    Ng2TelInputModule,
  ],
  entryComponents: [
    PolicyConfirmDialogComponent,
    MultiplePayerConfirmDialogComponent,
    ReceiptComponent,
    EslipsAccountsComponent,
    EslipsAccountsComponent,
    UpdateServiceLineComponent,
    DeletePayerModalComponent,
    ServiceLineModalComponent,
    PayerMapModalComponent,
    UploadTabComponent,
    UploadInvoiceComponent,
    TestInvoiceComponent,
    ApprovalModalComponent,
    EditDepartmentComponent,
    CreateMemberComponent,
    CurrencyManagementComponent,
    CreatePayerComponent,
    UploadPayersComponent,
    CreatingPayerComponent,
    CreateDepartmentComponent,
    PayEslipComponent,
    EditDepartmentComponent,
    CommissionSettingsComponent,
    InvoiceMapComponent,
    CongratulationsComponent,
    InvoiceMappingComponent,
    UploadPolicyExcelComponent,
    AddPolicyComponent,
    ViewPayerPolicyComponent,
    PolicyFileDataComponent,
    UpdatePolicyComponent,
    InsurancePayerComponent
  ],
  providers: [],
})
export class BillerModule { }
