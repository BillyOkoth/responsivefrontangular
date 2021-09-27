import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-failed-eslips',
  templateUrl: './failed-eslips.component.html',
  styleUrls: ['./failed-eslips.component.scss']
})
export class FailedEslipsComponent implements OnInit {
  rows = [];
  loading = false;
  aa = false;
  searchValue;

  constructor( private eslipService: EslipsService,
    private router: Router,
    private toastr: ToastrService,
    public role: RolesService
    ) { }

  ngOnInit() {
    this.getFailedEslips();
  }

  getFailedEslips() {
    const payload = {};
    this.eslipService.FailedPaidEslips(payload).subscribe(
      (response: any) => {

            switch (response.messageCode) {
              case '02':
                this.toastr.warning(response.message);
                break;

              default:
                this.rows = response;
                break;
            }

      }
    );
  }

  payEslip(rww) {
    this.loading = true;


    const payload = {
      eslip_no: rww.eslip_no
    };

    this.eslipService.PayFailedPaidEslips(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;
           if (response.messageCode === '00') {
              this.toastr.success(response.message, 'Success');
              this.ngOnInit();
           } else if (response.messageCode == '02') {
            this.toastr.warning(response.message, 'Warning');
           } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
           } else {}
      }
    );

  }


  viewMore(rww) {
    this.router.navigate(['/admin/failed-accounts']);

    sessionStorage.setItem('failed_no', rww.eslip_no);

  }
  setIndex(ii) {
    this.aa = ii;

  }


}
