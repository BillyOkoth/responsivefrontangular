import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reject-edited-group',
  templateUrl: './reject-edited-group.component.html',
  styleUrls: ['./reject-edited-group.component.scss']
})
export class RejectEditedGroupComponent implements OnInit {

  loading = false ;
  GroupName = '';
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
    ) { }

    ngOnInit() {
      this.GroupName =  sessionStorage.getItem('RejectedEditedGroupName');
    }


    closeDialog() {
      this.modalService.closeAll();
    }

    RejectEditedGroup() {

     this.loading = true;
      const payload = {
        group_id: sessionStorage.getItem('RejectedEditedGroupId'),

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
                  this.billerService.updateEditedGroupSubject.next(true);
                  this.modalService.closeAll();
                  break;
              }

        }
      );

    }
    }



