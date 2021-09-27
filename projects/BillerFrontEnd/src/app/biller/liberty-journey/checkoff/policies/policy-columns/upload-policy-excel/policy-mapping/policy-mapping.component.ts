import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy-mapping',
  templateUrl: './policy-mapping.component.html',
  styleUrls: ['./policy-mapping.component.css'],
})
export class PolicyMappingComponent implements OnInit {
  loading = false;
  date;
  policy_holder_name;
  policy_amount;
  policy_number;
  columns = [];

  constructor(
    private policy: PoliciesService,
    private modal: NzModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.columns = this.policy.policyColumns;
  }

  saveColumns() {
    this.loading = true;

    const payload = {
      date: this.date.toString(),
      amount: this.policy_amount.toString(),
      policy_no: this.policy_number.toString(),
      name: this.policy_holder_name.toString(),
      payer_code: sessionStorage.getItem('policy_payer'),
    };

    console.log(payload);
    this.policy.setPolicyColumns(payload).subscribe((response: any) => {
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
