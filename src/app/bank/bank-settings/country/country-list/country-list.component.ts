import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { UpdateCountryComponent } from '../../../misc/update-country/update-country.component';
import { ConfirmListComponent } from '../confirm-list/confirm-list.component';
import { AddCountryComponent } from '../add-country/add-country.component';
import { UploadCountriesComponent } from '../upload-countries/upload-countries.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {


  loading = false;
  searchValue = '';
  aa = false;

  allListOfCountries = [];
  rows = [];
  constructor(
    public boaringData: OnboardingService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.boaringData.fetchCountrySubject.subscribe(value => {
      this.getCountries();

    });

  }
  setIndex(ii) {
    this.aa = ii;
  }
  getCountries() {
    this.loading = true;
    this.boaringData.allCountries().subscribe(
      (response: any) => {
        this.loading = false;
        this.allListOfCountries = response;
        this.rows = response;
      },
    );
  }

  deleteCountry(data) {
    sessionStorage.setItem('CountryCode', data.countryCode);
    sessionStorage.setItem('CountryName', data.countryName);
   const modal = this.modalService.create({
      nzTitle: 'Delete Country',
      nzContent: ConfirmListComponent,
      nzFooter: null,
      nzWidth: '40vw',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getCountries()
    });
  }

  editCountry(data) {
    sessionStorage.setItem('CODE', data.countryCode);
    sessionStorage.setItem('COUNTRY', data.countryName);
    sessionStorage.setItem('ID', data.country_id);
 const modal =   this.modalService.create({
      nzTitle: 'Update Country',
      nzContent: UpdateCountryComponent,
      nzFooter: null,
      nzWidth: '40vw',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getCountries()
    });
  }

  addCountry() {
   const modal =  this.modalService.create({
      nzTitle: 'Add Country',
      nzContent: AddCountryComponent,
      nzFooter: null,
      nzWidth: '70%',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getCountries()
    });
  }

  uploadCountries(){
  const modal =   this.modalService.create({
      nzTitle: "Upload list of countries",
      nzContent: UploadCountriesComponent,
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%'
    })
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getCountries()
    });
  }
}
