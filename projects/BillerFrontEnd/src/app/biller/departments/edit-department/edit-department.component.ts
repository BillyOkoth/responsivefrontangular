import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu-service/menu.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  department = '';
  userId = '';
  id = '';
  loading = false;
  roleLists = [];
  selectedHead: any;
  constructor(
    private menuService: MenuService,
    private toastr: ToastrService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.department = sessionStorage.getItem('deptName');
    this.id = sessionStorage.getItem('idSet');
    this.userId = sessionStorage.getItem('userId');
    this.getMyTeamRecords();
  }

  save() {
    if (this.selectedHead) {
      const payload = {
        id: this.id,
        name: this.department,
        user_id: this.selectedHead.id
      };

      this.menuService.editDepartment(payload).subscribe((response: any) => {
        switch (response.messageCode) {
          case '00':
            this.menuService.fetchdepartmentSubject.next(true);
            this.toastr.success(response.message, 'Success');
            break;

          default:
            this.toastr.warning(response.message, 'Warning');
            break;
        }
      });
    } else {
      const payload = {
        id: this.id,
        name: this.department,
        user_id: this.userId
      };

      this.menuService.editDepartment(payload).subscribe((response: any) => {
        switch (response.messageCode) {
          case '00':
            this.menuService.fetchdepartmentSubject.next(true);
            this.toastr.success(response.message, 'Success');
            break;

          default:
            this.toastr.warning(response.message, 'Warning');
            break;
        }
      });
    }
  }
  getMyTeamRecords() {
    this.loading = true;
    const payload = {};
    this.loginService.getCompanyUsers(payload).subscribe((response: any) => {
      this.loading = false;

      this.roleLists = response;
    }),
      (err: any) => {};
  }
}
