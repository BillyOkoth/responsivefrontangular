import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-approve-edit-biller-modal',
  templateUrl: './approve-edit-biller-modal.component.html',
  styleUrls: ['./approve-edit-biller-modal.component.scss']
})
export class ApproveEditBillerModalComponent implements OnInit {

  loading = false ;
  BillerName = '';
  companyName2;
  location2;
  website2;
  phone2;
  alias2;
  sector2;
  chargetype2;
  percentage2;
  prefix2;
  customercare2;
  currency2;
  paybill2;
  branch2;
  chargeAmount2;

  chargeAmount1;
  companyName1;
  location1;
  website1;
  phone1;
  alias1;
  sector1;
  chargetype1;
  percentage1;
  prefix1;
  customercare1;
  currency1;
  paybill1;
  branch1;
  data = [];


    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
      public role: RolesService
    ) { }

    ngOnInit() {
      this.BillerName =  sessionStorage.getItem('ApproveEditedBillerName');

      this.data = JSON.parse(sessionStorage.getItem('billerEdited'));

      this.companyName2 =  sessionStorage.getItem('editedCompany');
      this.location2 =    sessionStorage.getItem('editedLocation');
      this.website2 =     sessionStorage.getItem('editedWebsite');
      this.phone2 =  sessionStorage.getItem('editedPhone');
      this.alias2 = sessionStorage.getItem('editedAlias');
      this.sector2 =  sessionStorage.getItem('editedSector');
      this.chargetype2 = sessionStorage.getItem('editedChargeType');
      this. chargeAmount2 = sessionStorage.getItem('editedAmountCharge');
      this.percentage2 = sessionStorage.getItem('editedPercentage');
      this.prefix2 = sessionStorage.getItem('editedPrefix');
      this.customercare2 =  sessionStorage.getItem('editedCustomerCare');
      this.currency2 =  sessionStorage.getItem('editedCurrency');
      this.paybill2 =   sessionStorage.getItem('editedPaybill');
      this.branch2 =   sessionStorage.getItem('editedBranch');

      /// Unedited data.
      this.companyName1 = this.data[0].company_name;
      this.location1 =    this.data[0].biller_location;
      this.website1 =  this.data[0].website;
      this.phone1 =  this.data[0].phone;
      this.alias1 = this.data[0].alias;
      this.sector1 = this.data[0].sector;
      this.chargetype1 = this.data[0].charge_type;
      this. chargeAmount1 = this.data[0].amount_to_charge;
      this.percentage1 = this.data[0].percentage;
      this.prefix1 =  this.data[0].prefix;
      this.customercare1 = this.data[0].customer_care;
      this.currency1 = this.data[0].currency;
      this.paybill1 =   this.data[0].paybill;
      this.branch1 =  this.data[0].branch;





    }


    closeDialog() {
      console.log('hit');
      this.modalService.closeAll();
    }

    ApproveEditBiller() {

      sessionStorage.getItem('ApproveEditedEmail');
      sessionStorage.getItem('ApproveeditedCode');
      sessionStorage.getItem('ApproveEditedBillerName');


     this.loading = true;
      const payload = {
        comp_code: sessionStorage.getItem('ApproveeditedCode'),
        email: sessionStorage.getItem('ApproveEditedEmail')
      };
      this.role.approveEditingBiller(payload).subscribe(
        (response: any) => {
          this.loading = false;
          switch (response.messageCode) {
                case '02':
                  this.toastr.warning(response.message);
                  break;
                case '06':
                  this.toastr.warning(response.message);
                  break;
                default:
                  this.toastr.success(response.message);
                  this.billerService.approveeditedBillerSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



