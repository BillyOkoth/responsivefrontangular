import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BillerTeamService } from 'src/app/core/services/billers/biller-team/biller-team.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-payer-member',
  templateUrl: './payer-member.component.html',
  styleUrls: ['./payer-member.component.scss']
})
export class PayerMemberComponent implements OnInit {
  loading = false;
  userGroups: any = [];
  createMember: FormGroup;
  phone_number = '';
  code = '';
  rows: any = [];

  constructor(   private payerTeam: BillerTeamService,
    private fb: FormBuilder,
    private toastr: ToastrService, private modalRef: NzModalRef) { }

  ngOnInit() {
    this.code = sessionStorage.getItem('comp_code');
    this.getUserGroups();
    this.createMember = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email_address: [
        '',
        [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]
      ],
      group_id: ['', Validators.required],
      employeeCode: ['', Validators.required],
      phone_number: ['', Validators.required],
      national_id: ['', Validators.required]
    });
  }

  getMembers() {
    this.loading = true;

    const payload = {
      comp_code: this.code
    };
    this.payerTeam.getBillerTeamMembers(payload).subscribe((resp: any) => {
      this.loading = false;
      this.rows = resp;
    });
  }

  getUserGroups() {
    const payload = {
      comp_code: this.code
    };
    this.payerTeam.getUserGroups(payload).subscribe((resp: any) => {
      this.userGroups = resp;
    });
  }

  getNumber(data: any) {
    this.phone_number = data;
  }
  createTeamMember() {
    this.loading = true;
    const formData = this.createMember.value;
    const payload = {
      personel_l_name: formData.fname,
      personel_f_name: formData.lname,
      email: formData.email_address,
      phone: this.phone_number,
      national_id: formData.national_id,
      employeeCode: formData.employeeCode,
      group_id: formData.group_id.group_id,
      comp_code: this.code
    };
    this.payerTeam.addTeamMember(payload).subscribe((resp: any) => {
      this.loading = false;
      switch (resp.messageCode) {
        case '00':
          this.toastr.success(resp.message);
          this.modalRef.close();
          break;

        default:
          this.toastr.warning(resp.message);
          break;
      }
    });
  }

  hasError(value) {

  }
}

