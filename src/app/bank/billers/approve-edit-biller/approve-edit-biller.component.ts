import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { BoardingStepsService } from 'src/app/core/services/boarding-service/boarding.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NzModalService, valueFunctionProp } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';
import { RejectEditedBillerComponent } from '../reject-edited-biller/reject-edited-biller.component';
import { ApproveEditBillerModalComponent } from '../approve-edit-biller-modal/approve-edit-biller-modal.component';

@Component({
  selector: 'app-approve-edit-biller',
  templateUrl: './approve-edit-biller.component.html',
  styleUrls: ['./approve-edit-biller.component.scss']
})
export class ApproveEditBillerComponent implements OnInit {
  rows;
  loading;
  editedBillers;
  searchValue = '';
  disabled: boolean;
  constructor(
    private billerService: BillersService,
    private boardSteps: BoardingStepsService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NzModalService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.billerService.approveeditedBillerSubject.subscribe(
      value => {
        this.getBankUsers();
      }
    );

    this.disabled = this.role.billerAllRoles;
  }

  getBankUsers() {
    const payload = {};
    this.rows = [];
    this.editedBillers = [];

    this.loading = true;
    this.billerService.getAllUsersFromBankside(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (
            value.edit_user === 'yes' &&
            value.user_type.toLowerCase() === 'biller'
          ) {
            this.editedBillers.push(value);
            this.rows = this.editedBillers;

            // this.no_of_active_billers = this.editedBillers.length;
          }
        });
      },
      err => {
        this.toastr.error('There is no server connection!');
        this.loading = false;
      }
    );
  }


  approveBiller(data) {

    sessionStorage.setItem('ApproveEditedEmail', data.email);
    sessionStorage.setItem('ApproveeditedCode', data.comp_code);
    sessionStorage.setItem('ApproveEditedBillerName', data.company_name);
    const payload = {
      email: data.email,
      comp_code: data.comp_code
    };
    this.billerService.getBiller(payload).subscribe((response2: any) => {

      sessionStorage.setItem('billerEdited', JSON.stringify(response2));

    });

    this.billerService.getEditedBiller(payload).subscribe(
      (response: any) => {

        switch (response.messageCode) {
              case '02':
                this.toastr.warning(response.message);
                break;
              case '06':
                this.toastr.warning(response.message);
                break;

              default:
                this.toastr.success(response[0].message);

                sessionStorage.setItem('editedCompany', response[0].company_name);
                sessionStorage.setItem('editedLocation', response[0].biller_location);
                sessionStorage.setItem('editedWebsite', response[0].website);
                sessionStorage.setItem('editedPhone', response[0].phone);
                sessionStorage.setItem('editedAlias', response[0].alias);
                sessionStorage.setItem('editedSector', response[0].sector);
                sessionStorage.setItem('editedChargeType', response[0].charge_type);
                sessionStorage.setItem('editedAmountCharge', response[0].amount_to_charge);
                sessionStorage.setItem('editedPercentage', response[0].percentage);
                sessionStorage.setItem('editedPrefix', response[0].prefix);
                sessionStorage.setItem('editedCustomerCare', response[0].customer_care);
                sessionStorage.setItem('editedCurrency', response[0].currency);
                sessionStorage.setItem('editedPaybill', response[0].paybill);
                sessionStorage.setItem('editedBranch', response[0].branch);

                // sessionStorage.
                this.modalService.create({
                  nzTitle: 'Approve Edited Biller',
                  nzContent: ApproveEditBillerModalComponent,
                  nzFooter: null,
                  nzWidth: '40vw'
                });
                break;
            }


      }
    );




  }

  RejectEditedBiller(data) {
    sessionStorage.setItem('rejecteditedEmail', data.email);
    sessionStorage.setItem('rejecteditedCode', data.comp_code);
    sessionStorage.setItem('rejecteditedBillerName', data.company_name);


    this.modalService.create({
      nzTitle: 'Reject Edited Biller',
      nzContent: RejectEditedBillerComponent,
      nzFooter: null,
      nzWidth: '40vw'
    });
  }

}
