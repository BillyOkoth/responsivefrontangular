import {
  Component,
  OnInit,
} from '@angular/core';
import {
  StepTwo,
  EmailSend,
  BillerModel,
} from 'src/app/core/services/onboarding/onboard.model';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  MaxLengthValidator,
} from '@angular/forms';

import { VerifyComponent } from '../../misc/verify/verify.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ValidateFirstName, ValidateLastName, ValidateEmail, CustomValidatorsComponent } from '../../home-page/custom-validators/custom-validators.component';
import { debounceTime } from 'rxjs/operators';


declare const intlTelInput: any;

@Component({
  selector: 'app-closed-biller',
  templateUrl: './closed-biller.component.html',
  styleUrls: ['./closed-biller.component.scss'],
})
export class ClosedBillerComponent implements OnInit {

  constructor(
    public stepsData: BoardingStepsService,
    private toastr: ToastrService,
    public boaringData: OnboardingService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private notification: NzNotificationService,

  ) { }


  get fval() {
    return this.stepOneForm.controls;
  }

  get f() {
    return this.stepOneForm.controls;
  }
  get get() {
    return this.stepTwoForm.controls;
  }
  get h() {
    return this.stepThreeForm.controls;
  }
  activeIndex = 0;
  address: string;
  selectedEmployeeCount = '';
  selectedMonthlyPayer = '';
  PHONE_PLUGIN: any;
  error: boolean;

  aa = false;

  service_name = '';
  product_name = '';
  account_number = '';
  currency = '';

  percentageSelected: boolean;
  amountSelected: boolean;
  noChargeSelected: boolean;
  monthlyFee: boolean;

  exactAmount: boolean;
  anyAmount: boolean;
  invoicePercentage: boolean;

  sectorsList = [];
  customerAccounts = [];
  loading = false;
  countryList = [];
  allListOfCountries = [];
  allListofCounties = [];
  allListofLocation = [];
  allChargeTypeList: any[];
  allPaymentList: any[];

  // forms ngmodel tags.
  exact_amount = '';
  any_amount = '';
  invoice_percentage = '';
  customer_number = '';
  company_email_address = '';
  admin_email = '';
  postal_address = '';
  phone_details = '';
  vat = '';
  kra_pin = '';
  physical_address = '';
  companyname = '';
  email_address = '';
  email = '';
  firstname = '';
  phonenumber = '';
  lastname = '';
  location = '';
  accountnumber = '';
  accountname = '';
  alias = '';
  sectorname = { sectorCode: ' ', sectorName: ' ' };
  description = '';
  employee_radio = '';
  service_charge = '';
  payers_radio = '';
  monthly_fee = '';
  country = { countryCode: ' ', countryName: ' ' };
  county = { branchCode: ' ', branchName: ' ', branch_id: ' ' };
  website = '';
  customer_care = '';
  biller_prefix = '';
  chargetype = { chargeId: ' ', chargeName: ' ' };
  paymentOption = { paymentId: ' ', paymentType: ' ' };
  percentage = '';
  amount_to_charge = '';
  biller_type = '';
  currency_type: any;
  registerForm: any;
  phone_no: any;
  admin_phone_no: any;
  phoneError: boolean;
  phone: any;
  admin_phone: any;
  current = 0;
  customerNumeber = '';
  // allChargeTypeList: any[];

  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;
  fourthForm: boolean;

  index = 'First-content';
  currencies: any;
  productDetails: any;
  billing_line = [];
  closedBillerType: { name: string; value: string }[];

  billerWizardForm = new FormGroup({
    stanbiaccountnumber: new FormControl(''),
  });
  stepOneForm = new FormGroup({
    customer_number: new FormControl(''),
    company_name: new FormControl(''),
    company_email_address: new FormControl(''),
    physical_address: new FormControl(''),
    website: new FormControl(''),
    customer_care: new FormControl(''),
    alias: new FormControl(''),
    pay_bill: new FormControl(''),
    kra_pin: new FormControl(''),
    vat: new FormControl(''),
    phone_details: new FormControl(''),
    postal_address: new FormControl(''),
    biller_prefix: new FormControl(''),
    sectorname: new FormControl(''),
    description: new FormControl(''),
    country: new FormControl(''),
    branch: new FormControl(''),
  });
  stepTwoForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    administrator_email: new FormControl(''),
    admin_phone: new FormControl(''),
    closed_biller_type: new FormControl(''),
  });

  stepThreeForm = new FormGroup({
    service_line_name: new FormControl(''),
    currency: new FormControl(''),
    specific_account: new FormControl(''),
    eslip_email: new FormControl(''),
    prefix: new FormControl(''),
  });

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next1(): void {
    this.current += 1;
    console.log(this.stepTwoForm.value.closed_biller_type);
    this.changeContent();
  }

  done(): void { }

  changeContent(): void {
    switch (this.current) {
      case 0: {

        this.index = 'First-content';
        this.firstForm = true;
        this.secondForm = false;
        this.thirdForm = false;
        this.fourthForm = false;
        break;
      }
      case 1: {
        this.secondForm = true;
        this.thirdForm = false;
        this.firstForm = false;
        this.fourthForm = false;
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.thirdForm = true;
        this.firstForm = false;
        this.secondForm = false;
        this.fourthForm = false;
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.thirdForm = false;
        this.firstForm = false;
        this.secondForm = false;
        this.fourthForm = true;
        this.index = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }



  next() {
    this.activeIndex++;
  }

  ok() {
    this.activeIndex = 0;
  }

  onChange(label: string) { }

  ngOnInit() {
    this.firstForm = true;
    this.billerWizardForm = this.fb.group({
      stanbiaccountnumber: ['', Validators.required],
    });




    this.stepOneForm = this.fb.group({
      customer_number: ['', Validators.required],
      company_name: ['', Validators.required],
      // ^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
      company_email_address: ['', [Validators.required,
      Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')]],
      // company_email_address:["", [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      physical_address: ['', Validators.required],
      website: ['', Validators.required],
      customer_care: ['', [Validators.required,
      Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')]],
      alias: ['', Validators.required],
      kra_pin: ['', Validators.required],
      vat: ['', Validators.required],
      phone_details: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      postal_address: ['', Validators.required],
      biller_prefix: ['', [Validators.required, Validators.minLength(4)]],
      // biller_prefix:["", [Validators.required,Validators.pattern('^\b(?:[E]\w+\b(?:\s*)?)+$')]],
      sectorname: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required],
      branch: ['', Validators.required],
      pay_bill: ['', Validators.required],

    });



    // Getter function in order to get form controls value


    this.stepTwoForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      admin_phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      administrator_email: ['', [Validators.required,
      Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')]],
      closed_biller_type: ['', [Validators.required]]

    });

    this.stepThreeForm = this.fb.group({
      specific_account: ['', Validators.required],
      service_line_name: ['', Validators.required],
      currency: ['', Validators.required],
      eslip_email: ['', [Validators.required,
      Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')]],
      // prefix :["", Validators.required,Validators.pattern('^\b(?:[E]\w+\b(?:\s*)?)+$')]
      prefix: ['', [Validators.required]],
    });

    this.getCountries();
    this.fetchSectors();

    this.allChargeTypeList = [
      { chargeId: '1', chargeName: 'USD' },
      { chargeId: '2', chargeName: 'KSH' },
      { chargeId: '3', chargeName: 'GBP' },
      { chargeId: '4', chargeName: 'Euro' },
    ];

    this.allPaymentList = [
      { paymentId: '1', paymentType: 'EXACT AMOUNT' },
      { paymentId: '2', paymentType: 'ANY AMOUNT' },
      { paymentId: '3', paymentType: 'PERCENTAGE OF INVOICE' },
    ];

    this.closedBillerType = [
      { name: 'Insurance', value: 'A' },
      { name: 'Normal', value: 'B' },
    ];

    this.currencies = [{ name: 'KSH' }, { name: 'USD' }];
  }

  fetchSectors() {
    const payload: StepTwo = {
      id: this.stepsData.billerId,
    };
    this.boaringData.FetchStepTwo(payload).subscribe(
      (response) => {
        this.sectorsList = response;
      },
      (err) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  getCountries() {
    this.boaringData.allCountries().subscribe(
      (response: any) => {
        this.allListOfCountries = response;
      },
      (error) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  countryFn() {
    const test = this.boaringData.allCountries;
    this.loading = false;

    this.boaringData.allCountries().subscribe(
      (response: any) => {
        this.countryList = response;

        this.countryList.forEach((element: any) => {
          this.stepsData.countryCode = element.countryCode;
        });
      },
      (err) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  onSelect(selectedCode) {
    const countryId = selectedCode.country_id;

    const payload: any = {
      country_id: countryId,
    };
    this.boaringData.getBranchesPerCountry(payload).subscribe(
      (response: any) => {
        this.allListofCounties = response;
      },
      (error) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  onSelectCharge(selectedCode) {
    if (selectedCode.chargeName === 'NO_CHARGE') {
      this.noChargeSelected = true;
      this.percentageSelected = false;
      this.amountSelected = false;
      this.monthlyFee = false;
    } else if (selectedCode.chargeName === 'PERCENTAGE') {
      this.percentageSelected = true;
      this.noChargeSelected = false;
      this.amountSelected = false;
      this.monthlyFee = false;
    } else if (selectedCode.chargeName === 'TRANSACTION CHARGE') {
      this.amountSelected = true;
      this.noChargeSelected = false;
      this.percentageSelected = false;
      this.monthlyFee = false;
    } else if (selectedCode.chargeName === 'MONTHLY FEE') {
      this.monthlyFee = true;
      this.amountSelected = false;
      this.noChargeSelected = false;
      this.percentageSelected = false;
    } else {
    }
  }

  onSelectPayment(selectedCode) {
    if (selectedCode.paymentType === 'EXACT AMOUNT') {
      this.exactAmount = true;
      this.anyAmount = false;
      this.invoicePercentage = false;
    } else if (selectedCode.paymentType === 'ANY AMOUNT') {
      this.anyAmount = true;
      this.exactAmount = false;
      this.invoicePercentage = false;
    } else if (selectedCode.paymentType === 'PERCENTAGE OF INVOICE') {
      this.exactAmount = false;
      this.anyAmount = false;
      this.invoicePercentage = true;
    } else {
    }
  }

  fetchLocation() {
    this.boaringData.FetchLocation().subscribe(
      (response: any) => {
        this.allListofLocation = response;
      },
      (err) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  validateEmail(data) {

    console.log('set', data);
    this.loading = true;


    const payload = {
      email: data
    };



    this.boaringData.validateEmail(payload).pipe(debounceTime(5000)).subscribe(
      (response: any) => {
        this.loading = false;

        return response.messageCode == '00'
          ? this.toastr.success(response.message, 'Success')
          : response.messageCode == '01'
            ? this.toastr.success(response.message, 'Success')
            : response.messageCode == '02'
              ? this.toastr.warning(response.message, 'Warning')
              : response.messageCode == '03'
                ? this.toastr.warning(response.message, 'Warning')
                : response.messageCode == '04'
                  ? this.toastr.warning(response.message, 'Warning')
                  : response.messageCode == '05'
                    ? this.toastr.warning(response.message, 'Warning')
                    : response.messageCode == '06'
                      ? this.toastr.warning(response.message, 'Warning')
                      : response.messageCode == '07'
                        ? this.toastr.warning(response.message, 'Warning')
                        : (this.loading = false);
      },
      (err) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }
  validatePrefix(data) {

    this.loading = true;


    const payload = {
      email: data
    };

    this.boaringData.validatePrefix(payload).subscribe(
      (response: any) => {
        this.loading = false;

        return response.messageCode == '00'
          ? this.toastr.success(response.message, 'Success')
          : response.messageCode == '01'
            ? this.toastr.success(response.message, 'Success')
            : response.messageCode == '02'
              ? this.toastr.warning(response.message, 'Warning')
              : response.messageCode == '03'
                ? this.toastr.warning(response.message, 'Warning')
                : response.messageCode == '04'
                  ? this.toastr.warning(response.message, 'Warning')
                  : response.messageCode == '05'
                    ? this.toastr.warning(response.message, 'Warning')
                    : response.messageCode == '06'
                      ? this.toastr.warning(response.message, 'Warning')
                      : response.messageCode == '07'
                        ? this.toastr.warning(response.message, 'Warning')
                        : (this.loading = false);
      },
      (err) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }
  // validate the bank account number
  validateAccount() {
    this.loading = true;
    const formData = this.billerWizardForm.value;

    const payload = {
      customerNumber: formData.stanbiaccountnumber,
    };

    this.boaringData.validateCustomerNumber(payload).subscribe(
      (response: any) => {
        this.loading = false;
        console.log('accounts', response.accounts);

        this.customerAccounts = response.accounts;
        this.customerNumeber = formData.stanbiaccountnumber;
        return response.messageCode === '00'
          ? this.toastr.success(response.message, 'Success')
          : response.messageCode === '01'
            ? this.toastr.success(response.message, 'Success')
            : response.messageCode === '02'
              ? this.toastr.warning(response.message, 'Warning')
              : response.messageCode === '03'
                ? this.toastr.warning(response.message, 'Warning')
                : response.messageCode === '04'
                  ? this.toastr.warning(response.message, 'Warning')
                  : response.messageCode === '05'
                    ? this.toastr.warning(response.message, 'Warning')
                    : response.messageCode === '06'
                      ? this.toastr.warning(response.message, 'Warning')
                      : response.messageCode === '07'
                        ? this.toastr.warning(response.message, 'Warning')
                        : (this.loading = false);
      },
      (err) => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  // pushing the service lines
  addServiceLine() {
    this.loading = true;

    console.log(this.stepThreeForm.value.specific_account.account_no);
    this.billing_line.push({
      service_line: this.stepThreeForm.value.service_line_name,
      account: this.stepThreeForm.value.specific_account.account_no,
      email: this.stepThreeForm.value.eslip_email,
      // charge_type: companyDescription.pricingModule.chargeName,
      currency: this.stepThreeForm.value.currency.chargeName,
      prefix: this.stepThreeForm.value.prefix,
    });


    this.loading = false;
    this.toastr.success('You have successfully added a Service Line.');
    this.stepThreeForm.reset();
  }

  // push the data to the backend.

  createBiller() {
    this.getcompanyNumber(this.phonenumber);
    this.getAdminNumber(this.phonenumber);
    if (!this.phone) {
      this.phone = this.phonenumber;
    }
    const payload: any = {
      // payload from the first step.
      customerNumber: this.stepOneForm.value.customer_number,
      company_name: this.stepOneForm.value.company_name,
      company_email: this.stepOneForm.value.company_email_address,
      physical_address: this.stepOneForm.value.physical_address,
      website: this.stepOneForm.value.website,
      customer_care: this.stepOneForm.value.customer_care,
      alias: this.stepOneForm.value.alias,
      paybill: this.stepOneForm.value.pay_bill,
      kra: this.stepOneForm.value.kra_pin,
      vat: this.stepOneForm.value.vat,
      phone: this.phone,
      postal_address: this.stepOneForm.value.postal_address,
      prefix: this.stepOneForm.value.biller_prefix,
      sector: this.stepOneForm.value.sectorname.name,
      branch_id: this.stepOneForm.value.branch.branch_id,
      business_description: this.stepOneForm.value.description,
      // payload from the step two:

      personelFirstname: this.stepTwoForm.value.firstname,
      personelLastname: this.stepTwoForm.value.lastname,
      email: this.stepTwoForm.value.administrator_email,
      biller_phone: this.admin_phone,
      closed_biller_type: this.stepTwoForm.value.closed_biller_type,

      // payload from step three:

      billing_line: this.billing_line,
    };

    sessionStorage.setItem('email', this.email_address);

    this.loading = true;
    this.boaringData.onboardClosedBiller(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/admin']);
        } else if (response.messageCode === '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '03') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '04') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '13') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  hasError(Success) {
    if (!Success) {
      this.error = true;
    }
  }

  // fn for email confirmation
  emailSentDialog(type: string) {
    this.notification.create(type, 'Notification Title', 'Biller Hasbe.');
  }

  getcompanyNumber(data) {
    // tslint:disable-next-line:radix
    const phone = parseInt(this.stepOneForm.value.phone_details).toString();
    this.phone_no = phone;

    let s = this.stepOneForm.value.phone_details;
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `+254${s}`;
    }

    if (s.length >= 12) {
      this.phone_no = s;
      this.phoneError = false;
    } else {
      this.phone_no = '';
      this.phoneError = true;
    }

    this.phone = s;
    return s;
  }

  getAdminNumber(data) {
    // tslint:disable-next-line:radix
    const phone = parseInt(this.stepTwoForm.value.admin_phone).toString();
    this.admin_phone_no = phone;

    let s = this.stepTwoForm.value.admin_phone;
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `+254${s}`;
    }

    if (s.length >= 12) {
      this.admin_phone_no = s;
      this.phoneError = false;
    } else {
      this.admin_phone_no = '';
      this.phoneError = true;
    }

    this.admin_phone = s;
    return s;
  }

  handleChange(e) {
    // this.eslipService.serviceTab = e;
  }

  setIndex(ii) {
    this.aa = ii;
  }
}
