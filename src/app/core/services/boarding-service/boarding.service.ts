import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StepFourResponse, EmailSend, ConfirmationBillerResponse, ConfirmBiller } from '../onboarding/onboard.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardingStepsService {

  billerEmail = '';
  billerFirstname = '';
  billerLastname = '';
  billerId;
  countryCode = '';
  usertoken = '';
  activeCount = '';
  pendingCount = '';
  InvitedCount = '';

  bankntken = '';




  constructor(private http: HttpClient) { }

  emailSend(payload: EmailSend): Observable<StepFourResponse> {
    return this.http.post<StepFourResponse>(`${environment.baseurl}sendEmailBiller`, payload);
  }

  confirmBiller(payload: ConfirmBiller): Observable<ConfirmationBillerResponse> {
    return this.http.post<ConfirmationBillerResponse>(`${environment.baseurl}auth/confirm-account`, payload);
  }

}


