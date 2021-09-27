import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../../service/login.service';
import { Team, getGroup, updateMyTeam } from '../../../../../service/login.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';


import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private myaccountsService: MyAccountsService
  ) {}
  roleLists = <any>[];
  loading = false;
  passmsgs = [];
  selectedCity;
  phonenumber: any;
  phone_no: any;
  phoneError: boolean;
  phone: any;
  phone_number: any;
  error: boolean;

  newTeamForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email_address: new FormControl(''),
    phone_number: new FormControl(''),
    national_id: new FormControl(''),
    employeeCode: new FormControl(''),
    group_id: new FormControl('')
  });

  ngOnInit() {
    this.newTeamForm = this.fb.group({
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

    this.getMyGroup();
  }

  createNewMemeber(): void {
    this.passmsgs = [];
    const formData = this.newTeamForm.value;

    if (this.newTeamForm.valid) {
      const payload: any = {
        personel_l_name: formData.fname,
        personel_f_name: formData.lname,
        email: formData.email_address,
        phone: this.phone_number,
        national_id: formData.national_id,
        employeeCode: formData.employeeCode,
        group_id: formData.group_id.group_id
      };


      this.loading = true;

      this.loginService.createNewTeam(payload).subscribe(
        (response: any) => {
          this.loading = false;
          this.loginService.alertServ = response.message;

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
        (err: any) => {
          this.loading = false;

        }
      );
    }

    this.getMyTeamRecords();

    this.newTeamForm.reset();
  }

  // get usergroups
  getMyGroup() {
    const payload: getGroup = {};
    this.loginService.getMyGroup(payload).subscribe(
      (response: any) => {
        this.roleLists = response;
      },
      (err: any) => {

      }
    );
  }
  closeModal(): void {
    // this.dialogRef.close();
  }

  closeStep() {
    // close this dialog

    this.router.navigate(['/dashboard/my-team']);
  }

  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.loginService.getCompanyUsers(payload).subscribe(
      (response: any) => {
        this.loading = false;

        response.forEach((value: any) => {
          this.loginService.team_id = value.id;
          this.loginService.team_email = value.email;
          this.loginService.team_role = value.groupDescription;
          this.loginService.team_name = value.name;
        });
      },
      (err: any) => {

      }
    );
  }

  // error hanler
  // public hasError = (controlName: string, errorName: string) => {
  //   return this.newTeamForm.controls[controlName].hasError(errorName);
  // };

  getNumber(data: any) {

    //  phone = parseInt(data).toString();
   this.phone_number = data;
  }
  hasError(Success) {
    if (!Success) {
      this.error = true;
    }
  }
}
