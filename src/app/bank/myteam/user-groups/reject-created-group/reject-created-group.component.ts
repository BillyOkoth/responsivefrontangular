import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-created-group',
  templateUrl: './reject-created-group.component.html',
  styleUrls: ['./reject-created-group.component.scss']
})
export class RejectCreatedGroupComponent implements OnInit {

  loading = false ;
  GroupName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.GroupName =  sessionStorage.getItem('RejectedCreatedGroupName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectCreatedGroup() {

     this.loading = true;
      const payload = {
        id: sessionStorage.getItem('RejectedCreatedGroupId'),

      };
      this.billerService.RejectaddBankGroup(payload).subscribe(
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
                  this.billerService.updateNewGroupSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



