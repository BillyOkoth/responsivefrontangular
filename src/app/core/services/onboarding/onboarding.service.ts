import { Injectable } from '@angular/core';
import {
  StepOne,
  StepOneResponse,
  StepTwoResponse,
  PostStepTwo,
  StepThree,
  StepThreeResponse,
  StepFour,
  StepFourResponse,

  StepFive,
  Branches,
  BranchesResponse,
  ResetResponse,
  ResetPassword,
  ConfirmBiller,
  Account,
    CountryPayload,
  CountryPayloadResponse
} from './onboard.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  fetchCountrySubject = new BehaviorSubject<any>(true);
  fetchBranchSubject = new BehaviorSubject<any>(true);
  showStep1 = false;
  showStep2 = false;
  showOpacity = false;
  selectedStep = 0;

  AccountNumber = '';
  AccountName = '';

  company_details = [];
  admin_details = [];
  billing_lines = [];


  constructor(private http: HttpClient) {}

  stepOne(payload: StepOne): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}billerBoarding`, payload);
  }

  FetchStepTwo(payload): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}getSectors`, payload);
  }
  PostStepTwo(payload: PostStepTwo): Observable<StepTwoResponse> {
    return this.http.post<StepTwoResponse>(
      `${environment.baseurl}billerSector`,
      payload
    );
  }

  stepThree(payload: StepThree): Observable<StepThreeResponse> {
    return this.http.post<StepThreeResponse>(
      `${environment.baseurl}billerNoOfEmployees`,
      payload
    );
  }

  stepFour(payload: StepFour): Observable<StepFourResponse> {
    return this.http.post<StepFourResponse>(
      `${environment.baseurl}billerBankInfo`,
      payload
    );
  }
  stepFive(payload: StepFive): Observable<StepFourResponse> {
    return this.http.post<StepFourResponse>(
      `${environment.baseurl}billerBillsMonth`,
      payload
    );
  }

  allCountries() {
    return this.http.get(`${environment.baseurl}getCountry`);
  }

  getCountryBranches(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}getCountryBranches`, payload);
  }

  editCountry(payload: CountryPayload): Observable<CountryPayloadResponse> {
    return this.http.post<CountryPayloadResponse>
    (`${environment.baseurl}editCountry`, payload);
  }

  editCountryBranches(payload: any): Observable<any> {
    return this.http.post<any>
    (`${environment.baseurl}editCountryBranches`, payload);
  }
  deleteBranch(payload: any): Observable<any> {
    return this.http.post<any>
    (`${environment.baseurl}deleteBranch`, payload);
  }

  deleteCountry(payload: any): Observable<any> {
    return this.http.post<any>
    (`${environment.baseurl}deleteCountry`, payload);
  }



  fetchPayers(payload: ConfirmBiller): Observable<StepOneResponse> {
    return this.http.post<StepOneResponse>(
      `${environment.baseurl}getAllPayers`,
      payload
    );
  }


  allBranches(payload: Branches): Observable<BranchesResponse> {
    return this.http.post<BranchesResponse>(`${environment.baseurl}`, payload);
  }

  passwordReset(payload: ResetPassword): Observable<ResetResponse> {
    return this.http.post<ResetResponse>(
      `${environment.baseurl}auth/changePassword`,
      payload
    );
  }

  getBranchesPerCountry(countryCodeSelected: any) {
    return this.http.post(
      `${environment.baseurl}getBranchesPerCountry`,
      countryCodeSelected
    );
  }

  FetchLocation() {
    return this.http.get(`${environment.baseurl}getLocations`);
  }

  validateAccount(payload: Account): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}validateAccount`,
      payload
    );
  }

  validateCustomerNumber(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}validateCustomerNumber`,
      payload
    );
  }
  validatePrefix(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}validatePrefix`,
      payload
    );
  }

  validateEmail(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}validateEmail`,
      payload
    );
  }

  //  consolidatedBillerBoarding
  consolidatedBillerBoarding(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}onboardOpenBiller`,
      payload
    );
  }

  onboardClosedBiller(payload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}onboardClosedBiller`,
      payload
    );
  }
}
