import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { RejectDeleteBillerComponent } from '../reject-delete-biller/reject-delete-biller.component';
import { ApproveDeletedBillerModalComponent } from '../approve-deleted-biller-modal/approve-deleted-biller-modal.component';

@Component({
  selector: 'app-approved-deleted-billers',
  templateUrl: './approved-deleted-billers.component.html',
  styleUrls: ['./approved-deleted-billers.component.scss']
})
export class ApprovedDeletedBillersComponent implements OnInit {
  rows = [];
  ActiveBillers = [];
  loading = false;
  searchValue = '';
  aa = false;
  disabled: boolean;

  constructor(
    private billerService: BillersService,
    private toastr: ToastrService,
    public role: RolesService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.billerService.approveDeletedBillerSubject.subscribe(
      value => {
        this.getBankUsers();
      }
    );

    this.disabled = this.role.billerAllRoles;
  }

  setIndex(ii) {
    this.aa = ii;
  }

  getBankUsers() {
    const payload = {};
    this.rows = [];
    this.ActiveBillers = [];
    this.loading = true;
    this.billerService.getAllUsersFromBankside(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (
            value.status === 'Active' &&
            value.user_type.toLowerCase() === 'biller' &&
            value.delete_user.toLowerCase() === 'yes'
          ) {
            this.ActiveBillers.push(value);
            this.rows = this.ActiveBillers;


          }
        });
      },
      err => {
        this.toastr.error('There is no server connection!');
        this.loading = false;
      }
    );
  }

  ApproveDeletedBiller(data) {

    sessionStorage.setItem('ApproveDeletedEmail', data.email);
    sessionStorage.setItem('ApproveDeleteCode', data.comp_code);
    sessionStorage.setItem('ApproveDeleteBillerName', data.company_name);


    this.modalService.create({
      nzTitle: 'Approve Delete Biller',
      nzContent: ApproveDeletedBillerModalComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });

  }

  RejectDeleteBiller(data) {
    sessionStorage.setItem('rejectedDeletedEmail', data.email);
    sessionStorage.setItem('rejectedDeleteCode', data.comp_code);
    sessionStorage.setItem('rejectedDeleteBillerName', data.company_name);


    this.modalService.create({
      nzTitle: 'Reject Delete Biller',
      nzContent: RejectDeleteBillerComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }


}
