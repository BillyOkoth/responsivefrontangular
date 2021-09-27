import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-delete-biller',
  templateUrl: './confirm-delete-biller.component.html',
  styleUrls: ['./confirm-delete-biller.component.scss']
})
export class ConfirmDeleteBillerComponent implements OnInit {
loading = false ;
BillerName = '';
  constructor(

    private billerService: BillersService,
    private toastr: ToastrService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.BillerName =  sessionStorage.getItem('deleteBillerName');
  }


  closeDialog() {
    this.modalService.closeAll();
  }

  deleteBiller() {

   this.loading = true;
    const payload = {
      email:  sessionStorage.getItem('deleteEmail'),
      comp_code: sessionStorage.getItem('deleteCode')
    };
    this.billerService.deleteBiller(payload).subscribe(
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
                this.billerService.updateBillerSubject.next(true);
                this.modalService.closeAll();
                break;
            }

      }
    );

  }
  }


