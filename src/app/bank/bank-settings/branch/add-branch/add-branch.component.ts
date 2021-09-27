import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { CountryBranchService } from 'src/app/core/services/country-branch/country-branch.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  loading = false;
  country = { countryCode: ' ', countryName: ' ', country_id: ' '};
  allListOfCountries = [];
  branchcode = '';
  branchname = '';


  constructor(
    private fb: FormBuilder,
    public countryService: CountryBranchService,
    private toastr: ToastrService,
    private location: Location,
    public boaringData: OnboardingService,
    private ref:NzModalRef
  ) { }

  ngOnInit() {
    this. getCountries();
  }

  getCountries() {
    this.boaringData.allCountries().subscribe(
      (response: any) => {
        this.allListOfCountries = response;

      },
      error => {
        this.toastr.error('There is no server connenction!');
      },
    );
  }



  createBranch(form: NgForm) {
      const payload: any = {
        country_id : this.country.country_id,
        brach_code:  this.branchcode,
        branch_name: this.branchname
      };


      this.loading = true;

      this.countryService.addBranch(payload).subscribe(
        (response: any) => {
          this.loading = false;
          this.ref.close()
          if (response.messageCode == '00') {
            this.boaringData.fetchBranchSubject.next(true);
            this.toastr.success( response.message, 'Success');
            form.reset();

          } else if (response.messageCode == '02') {
            this.toastr.warning( response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning( response.message, 'Warning');
          }

        }, (err: any) => {
          this.loading = false;

        }
      );

}

closeModal() {
  this.location.back();

}

}
