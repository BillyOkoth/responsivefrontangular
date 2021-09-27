import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateBranchComponent } from '../../../misc/update-branch/update-branch.component';
import { NzModalService } from 'ng-zorro-antd';
import { ConfirmBranchComponent } from '../confirm-branch/confirm-branch.component';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { UploadBranchesComponent } from '../upload-branches/upload-branches.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  allListOfCountries = [];
  cols = [];
  rows = [];
  allListofCounties = [];
  loadForm: FormGroup;
  loading = false;
  searchValue = '';
  aa = false;
  country = { countryCode: ' ', countryName: ' ', country_id: ' ', brach_code: ' ', branch_name: ' ' };

  constructor(
    private location: Location,
    public fb: FormBuilder,
    public boaringData: OnboardingService,
    private toastr: ToastrService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.boaringData.fetchBranchSubject.subscribe(
      value => {
        this.getBranches();
      }
    );

    this.cols = [
      { field: 'branchName', header: 'Branch Name' },
      { field: 'branchCode', header: 'Branch Code No' },
    ];

    this.loadForm = this.fb.group({
      country_field: ['', [Validators.required]],
    });
  }

  closeView() {
    this.location.back();
  }


  getBranches() {
    this.loading = true;
    const payload = {};
    this.boaringData.getCountryBranches(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;
      },

    );
  }

  onSelect(selectedCode) {

    const countryId = selectedCode.country_id;

    const payload: any = {
      country_id: countryId
    };
    this.boaringData.getBranchesPerCountry(payload).subscribe(
      (response: any) => {
        this.allListofCounties = response;
        this.rows = response;
      },
      error => {
        this.toastr.error('There is no server connenction!');
      },
    );
  }

  loadAccounts(selectedCode) {

    this.loading = true;
    const countryId = selectedCode.country_id;

    const payload: any = {
      country_id: countryId
    };
    this.boaringData.getBranchesPerCountry(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.allListofCounties = response;
        this.rows = response;
      },
    );

  }
  setIndex(ii) {
    this.aa = ii;
  }

  editBranch(data) {

    sessionStorage.setItem('BRANCHCODE', data.branchCode);
    sessionStorage.setItem('BRANCHNAME', data.branchName);
    sessionStorage.setItem('BRANCH_ID', data.branch_id);
    sessionStorage.setItem('BRANCHID', data.country_id);
    const modal = this.modalService.create({
      nzTitle: 'Update Branch',
      nzContent: UpdateBranchComponent,
      nzFooter: null,
      nzWidth: '40vw',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getBranches()
    });
  }

  deleteBranch(data) {

    sessionStorage.setItem('BranchCode', data.branchCode);
    sessionStorage.setItem('BranchName', data.branchName);

    const modal = this.modalService.create({
      nzTitle: 'Delete Branch',
      nzContent: ConfirmBranchComponent,
      nzFooter: null,
      nzWidth: '40vw',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getBranches()
    });
  }

  addBranch() {
    const modal = this.modalService.create({
      nzTitle: 'Add Branch',
      nzContent: AddBranchComponent,
      nzFooter: null,
      nzWidth: '60%',
      nzMaskClosable: false

    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getBranches()
    });
  }

  uploadBranches() {
    const modal = this.modalService.create({
      nzTitle: "Upload list of branches",
      nzContent: UploadBranchesComponent,
      nzFooter: null,
      nzWidth: '60%',
      nzMaskClosable: false

    })
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getBranches()
    });
  }

}
