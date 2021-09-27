import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';
import { SectorService } from 'src/app/core/services/sectors/sector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  numberValidationForm: FormGroup;
  companyDetailsForm: FormGroup;
  loading = false;
  countries: [] = [];
  branches: [] = [];
  sectors: [] = [];

  constructor(private fb: FormBuilder, private billerOnboarding: OnboardingService, private toastr: ToastrService,
    private sector: SectorService, private router: Router) { }

  ngOnInit(): void {
    this.billerOnboarding.selectedStep = 0;

    this.numberValidationForm = this.fb.group({
      customerNumber: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.companyDetailsForm = this.fb.group({
      customer_number: ['', Validators.required],
      company_name: ['', Validators.required],
      company_email: ['', [Validators.required, Validators.email]],
      websitePrefix: ['www.'],
      company_website: ['', Validators.required],
      customer_care_email: ['', [Validators.required, Validators.email]],
      company_alias: ['', [Validators.required, Validators.maxLength(4)]],

      phoneNumberPrefix: ['+254'],
      company_phone_number: ['', Validators.required],
      companyPrefix: [''],
      company_prefix: ['', [Validators.required]],
      company_paybill: ['', Validators.required],
      company_kra_pin: ['', [Validators.required, Validators.minLength(8)]],
      company_vat: ['', Validators.required],
      physical_address: ['', Validators.required],
      postal_address: ['', Validators.required],
      sector_name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(100)]],
      country: ['', Validators.required],
      branch: ['', Validators.required],
    });
    this.getSectors();
    this.getCountries();
    this.setValues();
    console.log(this.billerOnboarding.company_details.length);
  }

  getCountries() {
    this.billerOnboarding.allCountries().subscribe((response: any) => {
      this.countries = response;
    });
  }

  getBranches(value) {
    const payload: any = {
      country_id: value.country_id,
    };
    this.billerOnboarding.getBranchesPerCountry(payload).subscribe((response: any) => {
      this.branches = response;
    });
  }

  getSectors() {
    const payload = {};
    this.sector.getSectors(payload).subscribe((response: any) => {
      this.sectors = response;
    });
  }

  setValues() {
    if (this.billerOnboarding.company_details.length > 0) {
      this.companyDetailsForm.patchValue({
        customer_number: this.billerOnboarding.company_details[0].customerNumber,
        company_name: this.billerOnboarding.company_details[0].company_name,
        company_email: this.billerOnboarding.company_details[0].company_email,
        company_website: this.billerOnboarding.company_details[0].website,
        customer_care_email: this.billerOnboarding.company_details[0].customer_care,
        company_alias: this.billerOnboarding.company_details[0].alias,
        company_phone_number: this.billerOnboarding.company_details[0].phone,
        company_paybill: this.billerOnboarding.company_details[0].paybill,
        company_kra_pin: this.billerOnboarding.company_details[0].kra,
        company_vat: this.billerOnboarding.company_details[0].vat,
        physical_address: this.billerOnboarding.company_details[0].physical_address,
        postal_address: this.billerOnboarding.company_details[0].postal_address,
        prefix: this.billerOnboarding.company_details[0].prefix,
        sector_name: this.billerOnboarding.company_details[0].sector,
        // branch_id: this.billerOnboarding.company_details[0].branch.branch_id,
        description: this.billerOnboarding.company_details[0].business_description,
      });
    }
    if (this.billerOnboarding.company_details.length > 1) {
      this.billerOnboarding.company_details = [];
    }
  }
  validateAccount() {
    this.loading = true;
    const formData = this.numberValidationForm.value;

    const payload = {
      customerNumber: formData.customerNumber,
    };

    this.billerOnboarding.validateCustomerNumber(payload).subscribe(
      (response: any) => {
        this.loading = false;


        // this.customerAccounts = response.accounts;
        // this.customerNumeber = formData.stanbiaccountnumber;
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
    );
  }

  saveDetails() {
    const company_details = this.companyDetailsForm.value;
    const payload = {
      customerNumber: company_details.customer_number,
      company_name: company_details.company_name,
      company_email: company_details.company_email,
      website: company_details.websitePrefix + company_details.company_website,
      customer_care: company_details.customer_care_email,
      alias: company_details.company_alias,
      phone: company_details.phoneNumberPrefix + company_details.company_phone_number,
      paybill: company_details.company_paybill,
      kra: company_details.company_kra_pin,
      vat: company_details.company_vat,
      physical_address: company_details.physical_address,
      postal_address: company_details.postal_address,
      prefix: company_details.companyPrefix + company_details.biller_prefix,
      sector: company_details.sector_name.name,
      branch_id: company_details.branch.branch_id,
      business_description: company_details.description,
    };

    this.billerOnboarding.company_details.push(payload);
    console.log(this.billerOnboarding.company_details);
    this.billerOnboarding.selectedStep = +1;
    this.router.navigate(['/admin/add-closed-biller/admin-details']);

    console.log(payload);
  }
}
