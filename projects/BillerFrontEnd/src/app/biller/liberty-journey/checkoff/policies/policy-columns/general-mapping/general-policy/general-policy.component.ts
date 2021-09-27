import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-general-policy',
  templateUrl: './general-policy.component.html',
  styleUrls: ['./general-policy.component.css']
})
export class GeneralPolicyComponent implements OnInit {
  loading = false;
  date;
  customer_no;
  policy_amount;
  policy_number;
  policy_name;
  columns = [];

  constructor(
    private policy: PoliciesService,
    private modal: NzModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.columns = this.policy.policyColumns;
  }

  saveColumns() {
    this.loading = true;

    const payload = {
      date: this.date.toString(),
      amount: this.policy_amount.toString(),
      policy_no: this.policy_number.toString(),
      name: this.policy_name.toString(),
      customer_no: this.customer_no.toString()
    };

    this.policy.generalMappingPolicy(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          // this.billerService.fetchInvoiceUpdateSubject.next(true);
          setTimeout(() => {
            this.modal.closeAll();
          }, 2000);
          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }

}
