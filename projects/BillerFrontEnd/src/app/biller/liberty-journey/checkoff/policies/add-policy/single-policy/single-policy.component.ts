import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../services/policies.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-single-policy',
  templateUrl: './single-policy.component.html',
  styleUrls: ['./single-policy.component.css'],
})
export class SinglePolicyComponent implements OnInit {
  policy_holder_name = '';
  policy_date = '';
  policy_number = '';
  policy_amount = '';

  constructor(private policy: PoliciesService, private toastr: ToastrService, private ref: NzModalRef) {}

  ngOnInit() {}

  savePolicy() {
    const payload = {
      name: this.policy_holder_name,
      date: this.policy_date,
      amount: this.policy_amount,
      policy_no: this.policy_number,
      payer_code: sessionStorage.getItem('add_policy_to_payer'),
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

  pickDate(event ) {
    console.log(event);
    if (event === null) {
      this.policy_date = '';
    }
  }
}
