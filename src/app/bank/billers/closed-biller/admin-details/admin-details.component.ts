import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {
  adminDetailsForm: FormGroup;
  loading = false;
  closedBillerType: { name: string; value: string; }[];


  constructor(public billerOnboarding: OnboardingService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.billerOnboarding.selectedStep = 1;
    this.adminDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      phoneNumberPrefix: ['+254'],
      adminPhone: ['', Validators.required],
      closedBillerType: ['', Validators.required]
    });
    this.closedBillerType = [
      { name: 'Insurance', value: 'A' },
      { name: 'Normal', value: 'B' },
    ];
  }

  saveDetails() {
    const admin_details = this.adminDetailsForm.value;
    const payload = {
      personelFirstname: admin_details.firstName,
      personelLastname: admin_details.lastName,
      email: admin_details.adminEmail,
      biller_phone: admin_details.phoneNumberPrefix + admin_details.adminPhone,
      closed_biller_type: admin_details.closedBillerType,
    };
    console.log(payload);
    this.billerOnboarding.selectedStep = +1;
    this.router.navigate(['/admin/add-closed-biller/billing-lines']);
  }

  backToCompany() {
    this.billerOnboarding.selectedStep = -1;
    this.router.navigate(['/admin/add-closed-biller/']);
  }
}
