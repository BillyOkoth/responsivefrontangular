import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-delete-biller',
  templateUrl: './reject-delete-biller.component.html',
  styleUrls: ['./reject-delete-biller.component.scss']
})
export class RejectDeleteBillerComponent implements OnInit {

  loading = false ;
  BillerName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.BillerName =  sessionStorage.getItem('rejectedDeleteBillerName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectDeletedBiller() {
     this.loading = true;
      const payload = {
        email: sessionStorage.getItem('rejectedDeletedEmail'),
        comp_code: sessionStorage.getItem('rejectedDeleteCode')
      };
      this.billerService.RejectdeleteBiller(payload).subscribe(
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



