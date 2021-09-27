import { Component, OnInit } from '@angular/core';
import { Model, ChangePassword } from '../../service/login.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activateForm: FormGroup;
  // loading: boolean;
  capturedToken: any;
  activatedBillerName: any;
  activatedBillerEmail: any;
  loading = false;
  teamMenu = [];

  billerType = '';

  systemUserType: any;

  // changing password
  model: Model = new Model();
  changePasswordModel: ChangePassword = new ChangePassword();
  passwordForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  password: any;
  constructor(
    private router: ActivatedRoute,
    private routers: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activateForm = this.fb.group({
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    });

    this.activatedBillerEmail = sessionStorage.getItem('otp_email');
    this.activatedBillerName = sessionStorage.getItem('otp_name');
  }


  submitPasswordChange() {
    const formData = this.activateForm.value;
    // tslint:disable-next-line: triple-equals
    if (formData.newPass != formData.confirmPass) {
      this.toastr.warning('Passwords do not match');
      this.loading = false;
    } else {
      formData.confirmPass == formData.newPass;
      this.changePasswordModel.password = this.model.password;

      // post the new password set call the service.!

      const payload  = {
        password: formData.confirmPass,
        phone: sessionStorage.getItem('otp_phone'),
        comp_code: sessionStorage.getItem('otp_comp_code'),
        email: sessionStorage.getItem('otp_email'),
        code: sessionStorage.getItem('otp_code')

      };

      this.loading = true;
      this.loginService.resetOtpPassword(payload).subscribe(
        (response: any) => {

          if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');
          this.routers.navigate(['/login']);

          } else if (response.messageCode == '02') {
            this.toastr.success(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.success(response.message, 'Warning');
          } else if (response.messageCode == '08') {
            this.toastr.success(response.message, 'Warning');
          }


        },
        (err: any) => {
          this.loading = false;

        }
      );
    }
  }
}
