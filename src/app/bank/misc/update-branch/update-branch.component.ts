import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.scss']
})
export class UpdateBranchComponent implements OnInit {

  branchCode = '';
  branchName = '';

  branchId = '';
  saveloading = false;

  constructor(
    public boaringData: OnboardingService,
    private toastr: ToastrService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {

    this.branchCode =  sessionStorage.getItem('BRANCHCODE');
    this.branchName =  sessionStorage.getItem('BRANCHNAME');

  }

  editBranch() {

    const payload = {
      brach_code: this.branchCode,
      branch_name: this.branchName,
      country_id: sessionStorage.getItem('BRANCHID'),
      branch_id: sessionStorage.getItem('BRANCH_ID')
    };

    this.boaringData.editCountryBranches(payload).subscribe(
      (response: any) => {
        this.saveloading = true;

        if (response.messageCode == '00') {
          this.saveloading = false;
          this.toastr.success(response.message , 'Success.');
         this.boaringData.fetchBranchSubject.next(true);
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
