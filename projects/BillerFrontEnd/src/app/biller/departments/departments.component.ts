import { Component, OnInit } from '@angular/core';

import { CreateDepartmentComponent } from './create-department/create-department.component';
import { MenuService } from '../services/menu-service/menu.service';


import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],

})
export class DepartmentsComponent implements OnInit {

  rows;
  newRow: boolean;
  row: {};
  displayDialog: boolean;
  editBillLine: FormGroup;
  isVisible: boolean;
  loading = false;
  generatedData = [];
  searchValue = '';

  constructor(

    private menuService: MenuService,
    private loginService: LoginService,
    public fb: FormBuilder,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.menuService.fetchdepartmentSubject.subscribe(
      value => {

        if (!this.loading) {
          // prevent more than one request at a time ..
          this.getDeps();
        }
      }
    );
    // this.getDeps();
    this.editBillLine = this.fb.group({
      name: ['']
    });
  }

  getDeps() {
    this.loading = true;
    const payload = {};

    this.menuService.getDepartments(payload).subscribe(
      (response: any) => {
        this.loading = false;
      this.rows = response;

    });
  }

  showDialog() {
    this.modalService.create({
      nzTitle: 'Create Department',
      nzContent: CreateDepartmentComponent,
      nzFooter: null
    });
  }

  onRowSelect(value) {
    this.newRow = false;
    this.row = this.cloneRow(value);
    this.displayDialog = true;

  }

  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }



  viewMore(value) {
    this.menuService.department = value;
   this.modalService.create({
     nzTitle: 'Edit Department',
     nzContent: EditDepartmentComponent,
     nzFooter: null
   });
  }

  editDepartment(value) {

    sessionStorage.setItem('deptName', value.name);
    sessionStorage.setItem('idSet', value.id);
    sessionStorage.setItem('userId', value.user_id);

    this.modalService.create({
      nzTitle: 'Edit Department',
      nzContent: EditDepartmentComponent,
      nzWidth: '40vw',
      nzFooter: null
    });

  }

  // getMyTeamRecords() {
  //   this.loading = true;
  //   const payload = {};
  //   this.loginService.getCompanyUsers(payload).subscribe((response: any) => {
  //     this.loading = false;

  //     this.generatedData = response;
  //     this.rows = response;
  //   }),
  //     (err: any) => {
  //     ;
  //     };
  // }
}
