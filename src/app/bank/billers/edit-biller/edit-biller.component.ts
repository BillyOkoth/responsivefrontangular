import { Component, OnInit, Inject } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { ActiveBillersComponent } from '../active-billers/active-billers.component';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-biller',
  templateUrl: './edit-biller.component.html',
  styleUrls: ['./edit-biller.component.scss']
})
export class EditBillerComponent implements OnInit {
  allListOfCountries: any;
  sectorsList: any;
  branches: any;
  data = [];
  loading: boolean;
  allChargeTypeList: any[];

  percentageSelected = false;
  amountSelected = false;
  noChargeSelected = false;
  transactional =  false;
  chargetype = { chargeId: ' ', chargeName: ' ' };

  physicalAddress;
  phone;
  pay_bill;
  currency;
  amountCharge;
  percentage;
  pricingModule = { chargeId: ' ', chargeName: ' ' };
  companyEmail;
  vatCharge;
  kraPin;
  companyWebsite;
  billerPrefix;
  alias;
  email;
  lastName;
  firstName;
  companyName;
  website;
  amount_to_charge;
  customer_care;
  country = { countryCode: ' ', countryName: ' ' };
  userType;
  biller_type;
  branch_id;
  branch = { branchCode: ' ', branchName: ' ', branch_id: ' '};
  sector = { sectorCode: ' ', sectorName: ' ' };
  serviceCharge;
  messageCode;
  message;
  personelFirstname;
  personelLastname;

  user_type;
  created_by;
  updated_by;
  business_description;
  biller_month;
  comp_code;
  vat;
  kra;
  phoneOne;
  physical_address;
  postal_address;
  company_email;
  customerNumber;
  billing_line;
  employeeno;
  accname;
  accno;

  constructor(
    private billerService: BillersService,
    private toastr: ToastrService,
    private onboardingService: OnboardingService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.getBranches();
    this.fetchSectors();
    this.getCountries();
    this.data = JSON.parse(sessionStorage.getItem('biller_details'));


    this.companyName = this.data[0].company_name;
    this.physicalAddress = this.data[0].biller_location;
    this.phone = this.data[0].phone;
    this.pay_bill = this.data[0].paybill;
    this.currency = this.data[0].currency;
    this.amountCharge = this.data[0].amount_to_charge;
    this.percentage = this.data[0].percentage;
    this.pricingModule = this.data[0].charge_type;
    this.companyWebsite = this.data[0].website;
    this.billerPrefix = this.data[0].prefix;
    this.alias = this.data[0].alias;
    this.branch = this.data[0].branch;

    this.amount_to_charge = this.data[0].company_name;
    this.customer_care = this.data[0].customer_care;
    this.country = this.data[0].country;
    this.biller_type = this.data[0].biller_type;
    this.branch_id = this.data[0].branch_id;
    this.sector = this.data[0].sector;

    this.messageCode = this.data[0].messageCode;
    this.message = this.data[0].message;
    this.personelFirstname = this.data[0].personelFirstname;
    this.personelLastname =  this.data[0].personelLastname;
    this.biller_type = this.data[0].biller_type;
    this.user_type =  this.data[0].user_type;
    this.created_by = this.data[0].created_by;
    this.updated_by =  this.data[0].updated_by;
    this.business_description = this.data[0].business_description;
    this.biller_month = this.data[0].biller_month;
    this.comp_code =  this.data[0].comp_code;
    this.vat =  this.data[0].vat;
    this.kra = this.data[0].kra;
    this.phoneOne =  this.data[0].phone;
    this.physical_address =  this.data[0].physical_address;
    this.postal_address = this.data[0].postal_address;
    this.company_email = this.data[0].company_email;
    this.customerNumber = this.data[0].customerNumber;
    this.billing_line = this.data[0].billing_line;
    this.accname = this.data[0].stb_acc_name;
    this.accno = this.data[0].stb_acc_no;
    this.employeeno = this.data[0].employee_no;
    this.email = this.data[0].email;



    this.allChargeTypeList = [
      { chargeId: '1', chargeName: 'NO_CHARGE' },
      { chargeId: '2', chargeName: 'PERCENTAGE' },
      { chargeId: '3', chargeName: 'TRANSACTIONAL' }
    ];

  }

  updateBiller() {
    this.loading = true;

    const payload: any = {

      company_name: this.companyName,
      biller_location: this.physicalAddress,
      website: this.companyWebsite,
      phone: this.phone,
      alias: this.alias,
      sector: this.sector,
      charge_type:  this.pricingModule,
      amount_to_charge: this.amountCharge,
      percentage: this.percentage,
      prefix: this.billerPrefix,
      customer_care: this.customer_care,
      branch_id: this.branch_id,
      currency: this.currency,
      paybill: this.pay_bill,
      email: this.email,
      comp_code: this.comp_code ,

      // personelFirstname: this.personelFirstname,
      // personelLastname: this.personelLastname,
      // biller_type: this.biller_type,
      // user_type: this.user_type,

      // created_by:  this.created_by,
      // updated_by: this.updated_by,

      // business_description:this.business_description,
      // employee_no:  this.employeeno,
      // stb_acc_name: this.accname,
      // stb_acc_no:this.accno,

      // biller_month:this.biller_month,

      // country: this.country,
      // branch:   this.branch,
      // vat:  this.vat ,
      // kra:this.kra,
      // physical_address: this.physical_address ,
      // postal_address: this.postal_address ,
      // company_email:  this.company_email,


      // customerNumber:this.customerNumber,
      // billing_line: this.billing_line,
      // messageCode: this.messageCode,
      // message: this.message,
      // phone: this.phoneOne ,

    };
    this.billerService.updateBiller(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');
          this.billerService.updateBillerSubject.next(true);
          this.modalService.closeAll();
        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');
          this.billerService.updateBillerSubject.next(true);
          this.modalService.closeAll();
        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');
          this.billerService.updateBillerSubject.next(true);
          this.modalService.closeAll();
        } else {}



      },
      err => {
        this.loading = true;
        this.toastr.error(err.message);
        this.modalService.closeAll();
      }
    );
  }

  getCountries() {
    this.onboardingService.allCountries().subscribe(
      (response: any) => {
        this.allListOfCountries = response;
      },
      error => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  fetchSectors() {
    const payload = {};
    this.onboardingService.FetchStepTwo(payload).subscribe(
      response => {
        this.sectorsList = response;
      },
      err => {
        this.toastr.error('There is no server connenction!');
      }
    );
  }

  getBranches() {
    const payload = {};
    this.onboardingService.getCountryBranches(payload).subscribe(
      (response: any) => {
        this.branches = response;
      },
      error => {
        this.toastr.error('There is no server connenction!');
      },
    );
  }

  onSelectBranch() {

    const branch1 = this.branch;
    this.branches.find(value => {
      if (value.branchName == branch1) {
        this.branch_id = value.branch_id;
      }
    });

  }
  // fetchBranches(value) {
  //   const payload = {
  //     country_id: value.country_id
  //   };
  //   this.onboardingService
  //     .getBranchesPerCountry(payload)
  //     .subscribe(response => {
  //       this.branches = response;
  //     });
  // }

  onSelectCharge(selectedCode) {

    if (selectedCode === 'NO_CHARGE') {
      this.noChargeSelected = true;
      this.percentageSelected = false;
      this.amountSelected = false;
      this.transactional = false;
    } else if (selectedCode === 'PERCENTAGE') {
      this.percentageSelected = true;
      this.noChargeSelected = false;
      this.amountSelected = false;
      this.transactional = false;
    } else if (selectedCode === 'TRANSACTIONAL') {
      this.noChargeSelected = false;
      this.percentageSelected = false;
      this.amountSelected = true;
    }
  }
}
