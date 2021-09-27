import { Component, OnInit } from '@angular/core';

import { Team, getGroup } from '../../../../service/login.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { UserService } from '../../../services/user-service/user.service';
import {
  TeamMember,
  GetMyGroups
} from '../../../services/user-service/user.model';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { BillerService } from '../../../services/biller-service/biller.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private myaccountsService: BillerService
  ) { }
  roleLists = <any>[];
  loading = false;
  passmsgs = [];
  selectedCity;
  phone_number: any;
  error: boolean;

  newTeamForm: FormGroup;

  ngOnInit() {
    this.newTeamForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email_address: [
        '',
        [Validators.required, Validators.email]
      ],
      group_id: ['', Validators.required],
      employeeCode: ['', Validators.required],
      phone_prefix: ['+254'],
      phone_number: ['', Validators.required],
      national_id: ['', Validators.required]
    });

    this.getMyGroup();
  }

  createNewMemeber(): void {
    this.passmsgs = [];
    const formData = this.newTeamForm.value;

    if (this.newTeamForm.valid) {
      const payload: TeamMember = {
        personel_l_name: formData.fname,
        personel_f_name: formData.lname,
        email: formData.email_address,
        phone: formData.phone_prefix + formData.phone_number,
        national_id: formData.national_id,
        employeeCode: formData.employeeCode,
        group_id: formData.group_id.group_id
      };

      this.loading = true;

      this.userService.createNewTeam(payload).subscribe(
        (response: any) => {
          // this.loading = false;
          if (response.messageCode == '00') {
            this.myaccountsService.fetchTeamsSubject.next(true);
            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '01') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '02') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '03') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '04') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '07') {
            this.toastr.warning(response.message, 'Warning');
          } else {
          }
        },
        err => {
          this.loading = false;
        }
      );
    }

    this.getMyTeamRecords();

    this.newTeamForm.reset();
  }

  // get usergroups
  getMyGroup() {
    const payload: GetMyGroups = {};
    this.userService.getMyGroup(payload).subscribe(
      (response: any) => {
        this.roleLists = response;
      },
      err => {

      }
    );
  }
  closeModal(): void {
    this.modalService.closeAll();
  }

  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.userService.getCompanyUsers(payload).subscribe((response: any) => {
      this.loading = false;

      response.forEach((value: any) => {
        this.loginService.team_id = value.id;
        this.loginService.team_email = value.email;
        this.loginService.team_role = value.groupDescription;
        this.loginService.team_name = value.name;
      });
    });
  }

  // error hanler
  public hasError1 = (controlName: string, errorName: string) => {
    return this.newTeamForm.controls[controlName].hasError(errorName);
  }


  hasError(Success) {
    if (!Success) {
      this.error = true;
    }
  }


  getNumber(data: any) {
    this.phone_number = data;
  }

}
