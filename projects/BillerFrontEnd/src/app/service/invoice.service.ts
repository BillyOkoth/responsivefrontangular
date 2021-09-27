import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {}

  getInvoiceInfo(payload) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'payload.token'
    //   })
    // };

    const headers = { 'Authorization': payload.token };

    return this.http.post(`${environment.baseurl}getInvoiceInfo`, payload, {headers});
  }










//   getInvoiceInfo() {
//     return this.http.get(`${environment.baseurl}getInvoiceInfo`);
//   }
}
