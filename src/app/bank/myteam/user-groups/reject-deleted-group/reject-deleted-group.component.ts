import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-deleted-group',
  templateUrl: './reject-deleted-group.component.html',
  styleUrls: ['./reject-deleted-group.component.scss']
})
export class RejectDeletedGroupComponent implements OnInit {

  loading = false ;
  GroupName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.GroupName =  sessionStorage.getItem('RejectedDeleteGroupName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectDeletedGroup() {

     this.loading = true;
      const payload = {
        group_id: sessionStorage.getItem('RejectedDeleteGroupId'),

      };
      this.billerService.rejectEditingGroup(payload).subscribe(
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
                  this.billerService.updateDeletedGroupSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



