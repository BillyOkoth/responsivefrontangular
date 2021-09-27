import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import { CreateDepartment, GetDepartments, EditDepartment } from './menu.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  department: any;
  fetchdepartmentSubject = new BehaviorSubject<any>(true);
  fetchdepartmentSubject2 = new BehaviorSubject<any>(true);
  constructor(private http: HttpClient) {}

  createNewDepartment(payload: CreateDepartment) {
    return this.http.post(`${environment.baseurl}addDepartment`, payload);
  }

  getDepartments(payload: GetDepartments) {
    return this.http.post(`${environment.baseurl}getDepartments`, payload);
  }

  editDepartment(payload: EditDepartment) {
    return this.http.post(`${environment.baseurl}editDepartment`, payload);
  }

  addDepartment(payload: any) {
    return this.http.post(`${environment.baseurl}addDepartment`, payload);
  }


}
