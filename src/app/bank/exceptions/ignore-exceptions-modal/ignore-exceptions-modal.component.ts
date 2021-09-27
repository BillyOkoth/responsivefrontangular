import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ignore-exceptions-modal',
  templateUrl: './ignore-exceptions-modal.component.html',
  styleUrls: ['./ignore-exceptions-modal.component.scss']
})
export class IgnoreExceptionsModalComponent implements OnInit {
loading = false;
eslipnumber;
  constructor(
    private eslipService: EslipsService,
    private toastr: ToastrService,
    private modalService: NzModalService,
      ) { }

  ngOnInit() {
    this.eslipnumber = sessionStorage.getItem('ignoredvalueamount');
  }

  ignoreExceptions() {
    const payload = {
      id: sessionStorage.getItem('ExceptionsId')
    };
    this.eslipService.ignoreExceptionLogs(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');
          this.modalService.closeAll();
          this.eslipService.fetchExceptions.next(true);
        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      (err: any) => {
        this.toastr.error('There is no server Connection!');
      }
    );
  }

  closeDialog() {
    this.modalService.closeAll();
  }

}
