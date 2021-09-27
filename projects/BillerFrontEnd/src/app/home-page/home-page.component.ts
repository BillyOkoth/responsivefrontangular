import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidators } from 'ngx-validators';
import {
  FormGroup,
  FormBuilder,

} from '@angular/forms';
import { LoginService } from '../service/login.service';
import { emailSend } from '../service/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  formdata: any;
  loading = false;
  submitted = false;
  msgs = [];
  constructor(
    private router: Router,

    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,

  ) {}

  emailForm: FormGroup;

  ngOnInit() {
    this.emailForm = this.fb.group({
      email_address: ['', [EmailValidators.normal]]
    });
  }

  loginBiller() {
    this.router.navigate(['login/']);
  }

  get f() {
    return this.emailForm.controls;
  }

  getStarted() {
    this.msgs = [];
    this.formdata = this.emailForm.value;
    if (this.emailForm.valid) {
      this.submitted = false;

      const payload: emailSend = {
        email: this.formdata.email_address
      };

      this.loading = true;
      this.loginService.emailSend(payload).subscribe(
        response => {
          this.loading = false;

          if (response.messageCode == '00') {

            this.toastr.success('An email has been sent to ' + this.formdata.email_address);

            this.emailDialog();
          } else if (response.messageCode == '01') {
           this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '02') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        err => {
          this.loading = false;


        }
      );
    } else {
      this.submitted = true;
      this.toastr.warning('Enter a valid email address !');
    }
  }

  emailDialog() {

  }

}
