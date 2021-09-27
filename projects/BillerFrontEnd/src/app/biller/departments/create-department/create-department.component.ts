import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu-service/menu.service';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],

})
export class CreateDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  loading = false;

  roleLists = [];
  selectedHead = [];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private loginService: LoginService,
    private toastr: ToastrService) {}

  ngOnInit() {

    this.getMyTeamRecords();
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required]],
      userid : ['', [Validators.required]]
    });
  }

  createDepartment() {
    this.loading = true;
    const payload = {
      name: this.departmentForm.value.departmentName,
       user_id: this.departmentForm.value.userid.id,
    };

    this.menuService.createNewDepartment(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.menuService.fetchdepartmentSubject.next(true);
          this.toastr.success(response.message, 'Success');
          this.departmentForm.reset();
          break;

        default:

          this.toastr.warning(response.message, 'Warning');
          break;
      }
    });
  }

  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.loginService.getCompanyUsers(payload).subscribe((response: any) => {
      this.loading = false;

      this.roleLists = response;
      // this.rows = response;
    }),
      (err: any) => {

      };
  }
}
