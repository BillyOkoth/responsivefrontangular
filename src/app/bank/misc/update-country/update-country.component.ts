import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.scss']
})
export class UpdateCountryComponent implements OnInit {
  countryCode = '';
  countryName = '';

  countryId = '';
  saveloading = false;


  constructor(
    public boaringData: OnboardingService,
    private toastr: ToastrService,
    private modalService: NzModalService,
  ) { }
  rows = [];
  ngOnInit() {

    this.countryCode =  sessionStorage.getItem('CODE');
    this.countryName =  sessionStorage.getItem('COUNTRY'),
    this.countryId =  sessionStorage.getItem('ID');
    this.getCountries();
  }

  getCountries() {
    this.boaringData.allCountries().subscribe(
      (response: any) => {
        // this.allListOfCountries = response;
        this.rows =  response;
      },
      error => {
        this.toastr.error('There is no server connenction!');
      },
    );
  }


  editCountry() {

    const payload = {
      countryCode : this.countryCode,
      countryName: this.countryName,
      country_id : this.countryId
    };

    this.boaringData.editCountry(payload).subscribe(
      (response: any) => {

        if (response.messageCode == '00') {
          this.saveloading = false;
          this.toastr.success(response.message , 'Success.');
         this.boaringData.fetchCountrySubject.next(true);
         this.modalService.closeAll();
        } else if (response.messageCode == '02') {
          this.saveloading = false;
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
        } else if (response.messageCode == '06') {
          this.saveloading = false;
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();

        } else {}

      },
      error => {
        this.saveloading = false;
        this.toastr.error('There is no server connenction!');
      },
    );

  }




}
