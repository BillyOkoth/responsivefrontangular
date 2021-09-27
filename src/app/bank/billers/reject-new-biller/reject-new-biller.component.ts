import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-new-biller',
  templateUrl: './reject-new-biller.component.html',
  styleUrls: ['./reject-new-biller.component.scss']
})
export class RejectNewBillerComponent implements OnInit {

  loading = false ;
  BillerName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.BillerName =  sessionStorage.getItem('rejectBillerName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectBiller() {

     this.loading = true;
      const payload = {
        comp_code: sessionStorage.getItem('rejectCode')
      };
      this.billerService.rejectNewBiller(payload).subscribe(
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
                  this.billerService.pendingBillerSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



