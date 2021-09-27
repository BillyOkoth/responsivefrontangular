import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-list',
  templateUrl: './confirm-list.component.html',
  styleUrls: ['./confirm-list.component.scss']
})
export class ConfirmListComponent implements OnInit {
  loading = false;
  countryCode = '';
  countryName = '';
  constructor(private modalService: NzModalService,
    public boaringData: OnboardingService,
    private toastr: ToastrService, ) { }

  ngOnInit() {
    this.countryCode = sessionStorage.getItem('CountryCode');
    this.countryName = sessionStorage.getItem('CountryName');
  }

  closeDialog() {
    this.modalService.closeAll();

  }

  deleteCountry() {
    this.loading = true;

    const payload = {
      countryCode: this.countryCode,
    };

    this.boaringData.deleteCountry(payload).subscribe(
      (response: any) => {

        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success.');
          this.boaringData.fetchCountrySubject.next(true);
          this.modalService.closeAll();
          sessionStorage.removeItem('CountryCode');
          sessionStorage.removeItem('CountryName');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        } else { }

      },
    );
  }

}
