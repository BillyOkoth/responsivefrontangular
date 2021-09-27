import { Component, OnInit } from '@angular/core';
import { BillerTeamService } from 'src/app/core/services/billers/biller-team/biller-team.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss']
})
export class AddTeamMemberComponent implements OnInit {
  loading = false;
  userGroups: any = [];
  createMember: FormGroup;
  phone_number = '';
  code = '';

  constructor(
    private billerTeam: BillerTeamService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

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

  getUserGroups() {
    const payload = {
      comp_code: this.code
    };
    this.billerTeam.getUserGroups(payload).subscribe((resp: any) => {
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
    this.billerTeam.addTeamMember(payload).subscribe((resp: any) => {
      this.loading = false;
      switch (resp.messageCode) {
        case '00':
          this.toastr.success(resp.message);
          break;

        default:
          this.toastr.warning(resp.message);
          break;
      }
    });
  }

  hasError(value) {}
}
