import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CountryBranchService } from 'src/app/core/services/country-branch/country-branch.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  loading = false;
  constructor(
    private fb: FormBuilder,
    public country: CountryBranchService,
    private toastr: ToastrService,
    private location: Location,
    private onboarding: OnboardingService,
private ref:NzModalRef
  ) { }

  newCountryForm = new FormGroup({
    countryname: new FormControl(''),
    countrycode: new FormControl(''),
  });

  ngOnInit() {
    this.newCountryForm = this.fb.group({
      countryname: ['', Validators.required],
      countrycode: ['', Validators.required],
    });
  }


  createCountry() {
    const formData = this.newCountryForm.value;

    if (this.newCountryForm.valid) {
      const payload: any = {
        countryName: formData.countryname,
        countryCode: formData.countrycode
      };
      this.loading = true;

      this.country.addCountry(payload).subscribe(
        (response: any) => {
          this.ref.close()
          this.loading = false;
          if (response.messageCode === '00') {
            this.onboarding.fetchCountrySubject.next(true);
            this.toastr.success(response.message, 'Success');
            this.newCountryForm.reset();

          } else if (response.messageCode === '02') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '06') {
            this.toastr.warning(response.message, 'Warning');
          }

        }, (err: any) => {
          this.loading = false;
        }
      );
    }
  }

  closeModal() {
    this.location.back();
  }

}
