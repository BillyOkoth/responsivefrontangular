import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryBranchService {

  constructor(
    private http: HttpClient
  ) { }

  addCountry(payload) {
    return this.http.post(
      `${environment.baseurl}addCountry`,
      payload
    );
  }

  addBranch(payload) {
    return this.http.post(
      `${environment.baseurl}addBrach`,
      payload
    );
  }
  uploadCountries(payload){
    return this.http.post(
      `${environment.baseurl}addMultipleCountries`,
      payload
    );
  }
  uploadBranches(payload){
    return this.http.post(
      `${environment.baseurl}addMultipleBranches`,
      payload
    );
  }
}
