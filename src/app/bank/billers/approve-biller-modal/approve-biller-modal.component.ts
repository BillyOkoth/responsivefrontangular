import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-approve-biller-modal',
  templateUrl: './approve-biller-modal.component.html',
  styleUrls: ['./approve-biller-modal.component.scss']
})
export class ApproveBillerModalComponent implements OnInit {

  loading = false ;
  BillerName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
      public role: RolesService
    ) { }

    ngOnInit() {
      this.BillerName =  sessionStorage.getItem('ApproveBillerName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    ApproveBiller() {

      sessionStorage.getItem('ApproveBillerCode');
      sessionStorage.getItem('ApproveBillerName');


     this.loading = true;
      const payload = {
        comp_code: sessionStorage.getItem('ApproveBillerCode')
      };
      this.role.approveNewBiller(payload).subscribe(
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
                  this.billerService.approveDeletedBillerSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



