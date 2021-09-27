import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-edited-biller',
  templateUrl: './reject-edited-biller.component.html',
  styleUrls: ['./reject-edited-biller.component.scss']
})
export class RejectEditedBillerComponent implements OnInit {

  loading = false ;
  BillerName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.BillerName =  sessionStorage.getItem('rejecteditedBillerName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectEditedBiller() {

     this.loading = true;
      const payload = {
        email: sessionStorage.getItem('rejecteditedEmail'),
        comp_code: sessionStorage.getItem('rejecteditedCode')
      };
      this.billerService.RejectEditedBiller(payload).subscribe(
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



