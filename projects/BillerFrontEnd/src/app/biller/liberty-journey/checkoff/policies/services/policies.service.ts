import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  policyColumns;
  selectedTab;
  constructor(private http: HttpClient) { }

  getMappedPolicies(payload) {
    return this.http.post(
      `${environment.baseurl}billerGetPolicyMapping`,
      payload
    );
  }

  getGeneralMappedPolicies(payload) {
    return this.http.post(
      `${environment.baseurl}billerGetGeneralMapping`,
      payload
    );
  }
  setPolicyColumns(payload) {
    return this.http.post(
      `${environment.baseurl}billerSetPolicyMapping`,
      payload
    );
  }

  getMyPayers(payload): Observable<any[]> {
    return this.http.post<any[]>(`${environment.baseurl}getMyPayers`, payload).pipe(
      map(response =>
        response.map((value: any) => {
          const newField = {
            checked: false
          };
          return Object.assign(newField, value);
        })
      )
    );
  }

  addSinglePolicy(payload) {
    return this.http.post(
      `${environment.baseurl}billerAddIndividualPolicy`,
      payload
    );
  }

  addMultiplePolicy(payload) {
    return this.http.post(
      `${environment.baseurl}billerAddMultiplePolicy`,
      payload
    );
  }

  addGeneralMultiplePolicy(payload) {
    return this.http.post(
      `${environment.baseurl}billerUploadGeneralPolicy`,
      payload
    );
  }
  viewPayerPolicy(payload) {
    return this.http.post(
      `${environment.baseurl}billerGetCheckoffPolicy`,
      payload
    );
  }

  getPayerPolicies(payload) {
    return this.http.post(`${environment.baseurl}billerGetPayerPolicies`, payload);
  }

  getPolicyFileData(payload) {
    return this.http.post(`${environment.baseurl}getPolicyFileData`, payload);
  }

  generalMappingPolicy(payload){
    return this.http.post(`${environment.baseurl}billerSetGeneralMapping`, payload);
  }
}
