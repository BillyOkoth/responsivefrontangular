import { Component, OnInit } from '@angular/core';
import { StepTwo } from 'src/app/core/services/onboarding/onboard.model';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  MaxLengthValidator
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
// import { Session } from 'inspector';

declare const intlTelInput: any;

@Component({
  selector: 'app-biller-wizard',
  templateUrl: './biller-wizard.component.html',
  styleUrls: ['./biller-wizard.component.scss']
})
export class BillerWizardComponent implements OnInit {

  constructor(
    public stepsData: BoardingStepsService,
    private toastr: ToastrService,
    public boaringData: OnboardingService,
    private fb: FormBuilder,

    private router: Router,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) {}
  activeIndex = 0;
  address: string;
  selectedEmployeeCount = '';
  selectedMonthlyPayer = '';
  PHONE_PLUGIN: any;
  error: boolean;



  percentageSelected = false;
  amountSelected = false;
  noChargeSelected = false;
  sectorsList = [];
  loading = false;
  countryList = [];
  allListOfCountries = [];
  allListofCounties = [];
  allListofLocation = [];
  allChargeTypeList: any[];

  // forms ngmodel tags.
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
  country = { countryCode: ' ', countryName: ' ' };
  county = { branchCode: ' ', branchName: ' ', branch_id: ' ' };
  website = '';
  customer_care = '';
  biller_prefix = '';
  chargetype = { chargeId: ' ', chargeName: ' ' };
  percentage = '';
  amount_to_charge = '';
  biller_type = '';
  currency_type: any;
  registerForm: any;
  phone_no: any;
  phoneError: boolean;
  phone: any;
  current = 0;

  firstForm: boolean;
  secondForm: boolean;
  thirdForm: boolean;

  companyName;
  physicalAddress;
  postalAddress;
  kraPin;

  index = 'First-content';
  currencies: any;
  openBillerForm;
  accountNumberForm;
  companyDetails;
  companyAdminDetails;
  companyDescription;
  transactional;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next1(): void {
    this.current += 1;
    this.changeContent();

  }

  done(): void {}

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        this.firstForm = true;
        this.secondForm = false;
        this.thirdForm = false;
        break;
      }
      case 1: {
        this.secondForm = true;
        this.thirdForm = false;
        this.firstForm = false;
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.thirdForm = true;
        this.firstForm = false;
        this.secondForm = false;
        this.index = 'third-content';
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

  onChange(label: string) {}

  ngOnInit() {
    this.firstForm = true;
    this.accountNumberForm = this.fb.group({
      accountNumber: ['', [Validators.required]]
    });
    this.companyDetails = this.fb.group({
      // companyName: [""],
      // physicalAddress: [""],
      // postalAddress: [""],
      // kraPin: [""],
      vatCharge: ['', [Validators.required]],
      companyEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required]],
      companyWebsite: ['', [Validators.required]],
      pay_bill: ['', [Validators.required]]
    });

    this.companyAdminDetails = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.companyDescription = this.fb.group({

      alias: ['', [Validators.required]],
      billerPrefix: ['', [Validators.required]],
      noOfEmployees: ['', [Validators.required]],
      closedMonthlyPayers: ['', [Validators.required]],
      pricingModule: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      percentage: [''],
      amountCharge: [''],
      transactional: [''],
      branch: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });

    this.getCountries();
    this.fetchSectors();

    this.allChargeTypeList = [
      { chargeId: '1', chargeName: 'NO_CHARGE' },
      { chargeId: '2', chargeName: 'PERCENTAGE' },
      { chargeId: '3', chargeName: 'TRANSACTIONAL' }
    ];

    this.currencies = [{ name: 'KSH' }, { name: 'USD' }];
  }

  fetchSectors() {
    const payload: StepTwo = {
      id: this.stepsData.billerId
    };
    this.boaringData.FetchStepTwo(payload).subscribe(
      response => {
        this.sectorsList = response;
      },
      err => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  getCountries() {
    this.boaringData.allCountries().subscribe(
      (response: any) => {
        this.allListOfCountries = response;
      },
      error => {
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
      err => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  onSelect(selectedCode) {
    const countryId = selectedCode.country_id;

    const payload: any = {
      country_id: countryId
    };
    this.boaringData.getBranchesPerCountry(payload).subscribe(
      (response: any) => {
        this.allListofCounties = response;
      },
      error => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  onSelectCharge(selectedCode) {

    if (selectedCode.chargeName === 'NO_CHARGE') {
      this.noChargeSelected = true;
      this.percentageSelected = false;
      this.amountSelected = false;
      this.transactional = false;
    } else if (selectedCode.chargeName === 'PERCENTAGE') {
      this.percentageSelected = true;
      this.noChargeSelected = false;
      this.amountSelected = false;
      this.transactional = false;
    } else if (selectedCode.chargeName === 'TRANSACTIONAL') {
      this.noChargeSelected = false;
      this.percentageSelected = false;
      this.amountSelected = true;
    }
  }

  fetchLocation() {
    this.boaringData.FetchLocation().subscribe(
      (response: any) => {
        this.allListofLocation = response;
      },
      err => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  // bill

  // validate the bank account number
  validateAccount() {
    this.loading = true;
    const formData = this.accountNumberForm.value;

    const payload = {
      accountNumber: formData.accountNumber
    };

    this.boaringData.validateAccount(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');
          this.companyName = response.accountName,
          this.physicalAddress = response.townCountry,
          this.postalAddress = response.accountName,
          this.kraPin = response.kraPin;

          // this.companyDetails.patchValue({
          //   companyName: response.accountName,
          //   physicalAddress: response.townCountry,
          //   postalAddress: response.accountName,
          //   kraPin: response.kraPin,

          // });

        } else if (response.messageCode == '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '03') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '04') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '13') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }


      },
      err => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  // push the data to the backend.

  createBiller() {
    this.getNumber(this.phonenumber);
    if (!this.phone) {
      this.phone = this.phonenumber;
    }
    const companyDetails = this.companyDetails.value;
    const companyAdminDetails = this.companyAdminDetails.value;
    const companyDescription = this.companyDescription.value;

    const payload: any = {
      biller_location: this.physicalAddress,
      biller_phone: this.phone,
      company_name: this.companyName,
      personelFirstname: companyAdminDetails.firstName,
      personelLastname: companyAdminDetails.lastName,
      email: companyAdminDetails.email,
      alias: companyDescription.alias,
      employee_no: companyDescription.noOfEmployees,
      biller_month: companyDescription.closedMonthlyPayers,
      prefix: companyDescription.billerPrefix,
      website: companyDetails.companyWebsite,
      kra: this.kraPin,
      vat: companyDetails.vatCharge,
      customer_care: companyDetails.companyEmail,
      charge_type: companyDescription.pricingModule.chargeName,
      percentage: companyDescription.percentage,
      amount_to_charge: companyDescription.amountCharge,
      biller_type: 'open',
      currency: companyDescription.currency.name,
      branch_id: companyDescription.branch.branch_id,
      stb_acc_name: this.companyName,
      stb_acc_no: this.accountNumberForm.value.accountNumber,
      business_description: '',
      paybill: companyDetails.pay_bill

    };


    sessionStorage.setItem('email', this.email_address);

    this.loading = true;
    this.boaringData.consolidatedBillerBoarding(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/admin']);
        } else if (response.messageCode == '01') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '03') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '04') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '13') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      err => {
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

  getNumber(data) {
    // tslint:disable-next-line:radix
    const phone = parseInt(this.companyDetails.value.phoneNumber).toString();
    this.phone_no = phone;

    // let s = this.phonenumber;
    let s = this.companyDetails.value.phoneNumber;
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

  getNumber1(data) {
    // tslint:disable-next-line:radix
    const phone = parseInt(this.companyDetails.value.phoneNumber).toString();
    this.phone_no = phone;

    let s = this.phonenumber;
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `+254${s}`;
    }

    if (s.length > 0) {
      this.phone_no = s;
      this.phoneError = false;
    } else {
      this.phone_no = '';
      this.phoneError = true;
    }

    this.phone = s;
    return s;
  }
}
