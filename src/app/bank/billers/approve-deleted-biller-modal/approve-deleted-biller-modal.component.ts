import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/core/services/roles/roles';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillersService } from 'src/app/core/services/billers/billers.service';

@Component({
  selector: 'app-approve-deleted-biller-modal',
  templateUrl: './approve-deleted-biller-modal.component.html',
  styleUrls: ['./approve-deleted-biller-modal.component.scss']
})
export class ApproveDeletedBillerModalComponent implements OnInit {

  loading = false ;
  BillerName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
      public role: RolesService
    ) { }

    ngOnInit() {
      this.BillerName =  sessionStorage.getItem('ApproveDeleteBillerName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    ApproveDeleteBiller() {

      sessionStorage.getItem('ApproveDeletedEmail');
      sessionStorage.getItem('ApproveDeleteCode');
      sessionStorage.getItem('ApproveDeleteBillerName');


     this.loading = true;
      const payload = {
        comp_code: sessionStorage.getItem('ApproveDeleteCode'),
        email: sessionStorage.getItem('ApproveDeletedEmail')
      };
      this.billerService.ApprovedeleteBiller(payload).subscribe(
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



