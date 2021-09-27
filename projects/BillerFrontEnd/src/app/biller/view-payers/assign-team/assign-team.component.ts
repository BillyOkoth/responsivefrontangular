import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { MenuService } from '../../services/menu-service/menu.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayerService } from '../../services/payer-service/payer.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-assign-team',
  templateUrl: './assign-team.component.html',
  styleUrls: ['./assign-team.component.css']
})
export class AssignTeamComponent implements OnInit {

  loading = false;
  teams = [];
  departments = [];
  addPayerTeamForm: FormGroup;
  constructor(private users: UserService, private menu: MenuService, private fb: FormBuilder,
    private payer: PayerService, private toastr: ToastrService, private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.getMyTeamRecords();
    this.getServiceLine();
    this.addPayerTeamForm = this.fb.group({
      team: ['', [Validators.required]],
      department: ['', [Validators.required]]
    });
  }

  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.users.getCompanyUsers(payload).subscribe((response: any) => {
      this.loading = false;
      this.teams = response;
    });
  }

  getServiceLine() {
    this.loading = true;
    const payload = {};

    this.menu.getDepartments(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.departments = response;

      }
    });
  }


  saveToTeam() {
    this.loading = true;
    const team = this.addPayerTeamForm.value;
    const payload = {
      team_id: team.team,
      payer_code: sessionStorage.getItem('team_payer_code'),
      service_id: team.department
    };
    this.payer.addToTeam(payload).subscribe((response: any) => {
      this.loading = false;
     if (response.messageCode === '00') {
       this.toastr.success(response.message);
       this.modalRef.close();
     }
    });
  }
}
