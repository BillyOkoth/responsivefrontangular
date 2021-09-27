import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-lines',
  templateUrl: './billing-lines.component.html',
  styleUrls: ['./billing-lines.component.scss']
})
export class BillingLinesComponent implements OnInit {
  billingLinesForm: FormGroup;
  loading = false;
  currencies = [];
  billing_line = [];
  accounts = [];
  constructor(private fb: FormBuilder, public billerOnboarding: OnboardingService,
    private router: Router) { }

  ngOnInit(): void {
    this.billingLinesForm = this.fb.group({
      service_line_name: ['', Validators.required],
      currency: ['', Validators.required],
      specific_account: ['', Validators.required],
      eslip_email: ['', [Validators.required, Validators.email]],
      service_line_prefix: ['', Validators.required]
    });
    this.currencies = [{ name: 'KSH' }, { name: 'USD' }];
  }


  saveBiller() {

  }

  backToAdmin() {
    this.billerOnboarding.selectedStep = -1;
    this.router.navigate(['/admin/add-closed-biller/admin-details']);
  }
}
