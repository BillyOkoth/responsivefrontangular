import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayerService } from '../../../services/payer-service/payer.service';
import { BillerUpdatePayer } from '../../../services/payer-service/payer';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-payer',
  templateUrl: './edit-payer.component.html',
  styleUrls: ['./edit-payer.component.css']
})
export class EditPayerComponent implements OnInit {
  edited_row: any;
  editPayerForm: FormGroup;
  loading = false

  constructor(private fb: FormBuilder, private payer: PayerService, private toastr: ToastrService,
    private ref: NzModalRef) { }

  ngOnInit(): void {
    this.edited_row = JSON.parse(sessionStorage.getItem('edit_payer'));
    this.editPayerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      payerPhone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone_prefix: ['+254']
    });



    this.editPayerForm.patchValue(
      {
        email: this.edited_row.email,
        companyName: this.edited_row.company_name,
        payerPhone: this.edited_row.payer_phone.substring(3),
        firstName: this.edited_row.firstName,
        lastName: this.edited_row.lastName
      }
    );
  }

  saveDetails() {

    this.loading = true
    const details = this.editPayerForm.value;
    const payload: BillerUpdatePayer = {
      old_email: this.edited_row.email,
      email: details.email,
      company_name: details.companyName,
      personel_f_name: details.firstName,
      personel_l_name: details.lastName,
      biller_phone: details.phone_prefix + details.payerPhone,
      comp_code: this.edited_row.payer_code
    };
    // console.log(payload);
    this.payer.billerUpdatePayer(payload).subscribe((response: any) => {
      this.ref.close()
      this.loading = false

      if (response.messageCode === '00') {
        this.toastr.success(response.message);
      } else {
        this.toastr.warning(response.message);
      }
    });
  }
}
