import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rejected-eslips',
  templateUrl: './rejected-eslips.component.html',
  styleUrls: ['./rejected-eslips.component.scss']
})
export class RejectedEslipsComponent implements OnInit {


  loading = false;
  rows = [];
  searchValue = '';

  constructor(
    private eslipService: EslipsService,
    private toastr: ToastrService,
    public role: RolesService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private modalService: NzModalService

  ) { }

  ngOnInit() {

    this.eslipService.fetchExceptions.subscribe(value => {
      this.getExceptions();
    }
    );

  }

  getExceptions() {
    this.loading = true;
    const ApproveExceptions = [];
    const payload = {};
    this.eslipService.getExceptionLogs(payload).subscribe((response: any) => {
      this.loading = false;
      response.forEach(value => {
        if (value.status == 'InProgress') {
          ApproveExceptions.push(value);
        }
      });
      this.rows = ApproveExceptions;
    });
  }



}
