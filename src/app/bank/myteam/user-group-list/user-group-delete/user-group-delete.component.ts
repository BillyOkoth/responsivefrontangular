import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { BillersService } from 'src/app/core/services/billers/billers.service';

@Component({
  selector: 'app-user-group-delete',
  templateUrl: './user-group-delete.component.html',
  styleUrls: ['./user-group-delete.component.scss']
})
export class UserGroupDeleteComponent implements OnInit {

  usergroup;
  loading = false;
  constructor(

    private modalService: NzModalService,
    private toastr: ToastrService,
    public loginService: BillersService,

  ) { }

  ngOnInit() {
    this.usergroup =  sessionStorage.getItem('usergroup');

  }

  deleteGroup() {
    const payload: any = {
      group_id: sessionStorage.getItem('usergroup_id')
    };

    this.loginService.deleteBankGroup(payload).subscribe(
      (response: any) => {
        this.loading = false;


        if ((response.messageCode = '00')) {

          this.toastr.success(response.message, 'Success');
          this.loginService.fetchGroupSubject.next(true);
          this.modalService.closeAll;
        } else if ((response.messageCode = '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '06')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {}
    );

  }

  closeDialog() {
    this.modalService.closeAll();

  }

}
