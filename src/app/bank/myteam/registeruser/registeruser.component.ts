import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import {  GetGroup } from 'src/app/core/services/billers/billers.model';
import { TeamsServiceService } from '../teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent implements OnInit {
  constructor(
    private loginService: BillersService,
    private router: Router,
    private fb: FormBuilder,
    private teamService: TeamsServiceService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    public role: RolesService
  ) {}
  roleLists = <any>[];
  notif = <any>[];
  loading = false;
  phone_no: string;
  phone: any;
  Group_Id;
  notifications;


  notification = [
    { notification_id: '1', notification_name: 'Yes'},
    { notification_id: '2', notification_name: 'No'}
];

  newTeamForm = new FormGroup({
    name: new FormControl(''),
    email_address: new FormControl(''),
    phone_number: new FormControl(''),
    other_name: new FormControl(''),
    surname: new FormControl(''),
    // group_id: new FormControl(""),
    // notification:new FormControl("")
  });

  ngOnInit() {
    this.newTeamForm = this.fb.group({
      name: ['', Validators.required],
      email_address: [
        '',
        [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]
      ],
      // group_id: ["", Validators.required],
      surname: ['', Validators.required],
      phone_number: ['', Validators.required],
      other_name: ['', Validators.required],
      // notification: ["", Validators.required]
    });

    this.getMyGroup();
    this.notif = [
      { notification_id: '1', notification_name: 'Yes'},
      { notification_id: '2', notification_name: 'No'}
    ];
  }

  createNewMemeber(): void {
    const formData = this.newTeamForm.value;
    this.getNumber(formData.phone_number);
    if (!this.phone) {
      this.phone = formData.phone_number;
    }
    if (this.newTeamForm.valid) {
      const payload  = {
        username: formData.name,
        email: formData.email_address,
        phone: this.phone,
        otherName: formData.other_name,
        surname: formData.surname,
        group_id: this.Group_Id.group_id,
        notification: this.notifications.notification_name
      };

      this.loading = true;

      this.loginService.registerUser(payload).subscribe(
        (response: any) => {
          this.loading = false;

          if (response.messageCode === '00') {
            this.teamService.fetchInvitedTeamSubject.next(true);
            this.toastr.success(response.message, 'Success');
            this.modalService.closeAll();
          } else if (response.messageCode === '01') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '02') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '03') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '04') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '06') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '07') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode === '08') {
            this.toastr.warning(response.message, 'Warning');
          } else {
          }
        },
        (err: any) => {
          this.loading = false;
        }
      );
    }
  }

  // get usergroups

  getMyGroup() {
    const payload: GetGroup = {};

    this.loginService.getBankGroups(payload).subscribe(
      (response: any) => {
        this.roleLists = response;
      },
      (err: any) => {}
    );
  }

  closeStep() {
    this.router.navigate(['/dashboard/my-team']);
  }
  getNumber(data) {
    // tslint:disable-next-line:radix
    const phone = parseInt(data).toString();
    this.phone_no = phone;

    let s = this.newTeamForm.value.phone_number;
    if (s.charAt(0) === '0') {
      s = s.substr(1);
      s = `+254${s}`;
    }

    if (s.length >= 12) {
      this.phone_no = s;
    } else {
      this.phone_no = '';
    }

    this.newTeamForm.value.phone_number = s;

    return s;
  }
}
