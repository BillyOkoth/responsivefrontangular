import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payer-approval',
  templateUrl: './payer-approval.component.html',
  styleUrls: ['./payer-approval.component.css']
})
export class PayerApprovalComponent implements OnInit {
  loading = false;
  capturedToken: any;
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private routers: ActivatedRoute
  ) {
    this.routers.queryParams.subscribe(params => {
      if (params.hasOwnProperty('token')) {
        this.capturedToken = params.token;
        sessionStorage.setItem('h-token', this.capturedToken);
      } else {
        const keys = Object.keys(params);

        for (const key of keys) {
          if (key.length > 20) {
            const tokenArray = key.split('=');

            this.capturedToken = tokenArray[1];
          }
        }
      }
    });

    sessionStorage.setItem('h-token', this.capturedToken);
   }

  ngOnInit() {

  }



  approveBiller() {
    this.loading = true;
    const payload = { };

    this.loginservice.acceptTobePayer(payload).subscribe(
      (response: any) => {
        this.loading = false;

        if (response.messageCode === '00') {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/login']);

        } else if (response.messageCode === '02') {
           this.toastr.warning(response.message, 'Warning');
        } else {}

      }
    );
  }


  toHomePage() {
    this.router.navigate(['/']);
  }



}
