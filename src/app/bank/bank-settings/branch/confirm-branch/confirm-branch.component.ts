import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-branch',
  templateUrl: './confirm-branch.component.html',
  styleUrls: ['./confirm-branch.component.scss']
})
export class ConfirmBranchComponent implements OnInit {

  loading = false;
  branchName = '';
  branchCode = '';


  constructor(private modalService: NzModalService,
    public boaringData: OnboardingService,
    private toastr: ToastrService, ) { }

  ngOnInit() {

    this.branchCode = sessionStorage.getItem('BranchCode');
    this.branchName = sessionStorage.getItem('BranchName');


  }

  deleteBranch() {
    this.loading = true;

    const payload = {
      brach_code: this.branchCode
    };

    this.boaringData.deleteBranch(payload).subscribe(

      (response: any) => {
        this.loading = false;
        if (response.messageCode === '00') {
          this.boaringData.fetchBranchSubject.next(true);
          this.modalService.closeAll();
          this.toastr.success(response.message, 'Success.');
        } else if (response.messageCode === '02') {
          this.modalService.closeAll();
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
        } else { }

      },
    );


  }

  closeDialog() {

    this.modalService.closeAll();

  }

}
