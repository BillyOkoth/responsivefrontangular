import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { MenuService } from '../../../../services/menu-service/menu.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-single-payer',
  templateUrl: './single-payer.component.html',
  styleUrls: ['./single-payer.component.css']
})
export class SinglePayerComponent implements OnInit {
  createPayerForm: FormGroup;
  phone_no: any;
  phoneError: boolean;
  phone: any;
  error: boolean;
  loading = true;
  billing_lines: any;
  billing: any;
  policyTypes = [];

  constructor(
    private fb: FormBuilder,
    private billerService: BillerService,
    private menuService: MenuService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.createPayerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      billing_line: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone_prefix: ['+254'],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      customer: ['', Validators.required],
      customer_code: ['', Validators.required],
      policy_type: ['', Validators.required]
    });
    this.loading = false;
    this.policyTypes = [
      {name: 'Checkoff', value: 'checkoff'},
      {name: 'Umbrella', value: 'umbrella'}
    ];
    this.getBillingLines();
  }

  sendEmail() {
    this.loading = true;
    const payload = {
      email: this.createPayerForm.value.email,
      customer_code: this.createPayerForm.value.customer_code,
      customer: this.createPayerForm.value.customer,
      location: this.createPayerForm.value.location,
      address: this.createPayerForm.value.address,
      city: this.createPayerForm.value.city,
      phone:  this.phone,
      billing_id: this.createPayerForm.value.billing_line.id,
      fname: this.createPayerForm.value.fname,
      lname: this.createPayerForm.value.lname,
      policy_type: this.createPayerForm.value.policy_type.value
    };



    this.billerService.billerAddPayer(payload).subscribe((resp: any) => {
      this.loading = false;
      if ((resp.messageCode = '00')) {
        this.modalService.closeAll();
        this.billerService.fetchInvitedSubject.next(true);
        this.toastr.success(resp.message, 'Success');
      } else if (resp.messageCode === '01') {
        this.toastr.warning(resp.message, 'Warning');
        this.modalService.closeAll();
      } else if (resp.messageCode === '02') {
        this.toastr.warning(resp.message, 'Warning');
      } else if (resp.messageCode === '03') {
        this.toastr.warning(resp.message, 'Warning');
      } else if (resp.messageCode === '05') {
        this.toastr.warning(resp.message, 'Warning');
      }
    });
  }

  getBillingLines() {
    const payload = {};

    this.menuService.getDepartments(payload).subscribe((response: any) => {
      this.billing_lines = response;
    });
  }


  getNumber(data) {
    // tslint:disable-next-line:radix
    const phone = parseInt(this.createPayerForm.value.phone).toString();
    this.phone_no = phone;

    // let s = this.phonenumber;
    let s = this.createPayerForm.value.phone;
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `254${s}`;
    }

    if (s.length >= 12) {
      this.phone_no = s;
      this.phoneError = false;
    } else {
      this.phone_no = '';
      this.phoneError = true;
    }

    this.phone = s;
    return s;
  }

  hasError(Success) {
    if (!Success) {
      this.error = true;
    }
  }
}
