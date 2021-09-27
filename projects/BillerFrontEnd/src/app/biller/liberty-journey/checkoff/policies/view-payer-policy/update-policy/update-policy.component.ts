import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../services/policies.service';
import { NzModalRef } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-policy',
  templateUrl: './update-policy.component.html',
  styleUrls: ['./update-policy.component.css'],
})
export class UpdatePolicyComponent implements OnInit {
  policy_holder_name = '';
  policy_date = '';
  policy_number = '';
  policy_amount = '';

  constructor(
    private policy: PoliciesService,
    private ref: NzModalRef,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const edited = JSON.parse(sessionStorage.getItem('row_edited'));
    console.log(edited);
    this.policy_amount = edited.amount;
    this.policy_number = edited.policy_no;
    this.policy_holder_name = edited.name;

  }

  savePolicy() {
    const payload = {
      name: this.policy_holder_name,
      date: this.policy_date,
      amount: this.policy_amount,
      policy_no: this.policy_number,
      payer_code: sessionStorage.getItem('view_payer_policy'),
    };

    this.policy.addSinglePolicy(payload).subscribe((response: any) => {
      this.ref.close();
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          this.policy_date;
          this.policy_holder_name;
          this.policy_number;
          this.policy_amount;
          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }

  pickDate(event) {
    if (event === null) {
      this.policy_date = '';
    }
  }
}
