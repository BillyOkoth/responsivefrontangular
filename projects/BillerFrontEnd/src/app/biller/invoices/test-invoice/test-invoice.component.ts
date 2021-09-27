import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { sendTestInvoice } from '../../../service/login.model';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NzNotificationService } from 'ng-zorro-antd';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { BillerService } from '../../services/biller-service/biller.service';

@Component({
  selector: 'app-test-invoice',
  templateUrl: './test-invoice.component.html',
  styleUrls: ['./test-invoice.component.css']
})
export class TestInvoiceComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private billerService: BillerService,
    private notification: NzNotificationService,
    private modal: NzModalService

  ) {}
  emailTo;
  loading: boolean;
  send_invoice: any;

  // the form group
  testInvoiceForm = new FormGroup({
    title: new FormControl(''),
    message: new FormControl('')
  });

  ngOnInit() {
    this.testInvoiceForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.emailTo = this.loginService.emailprofile;
  }

  closeModal(): void {

  }
  sendTestInvoice(): void {
    this.loading = true;
    const formData = this.testInvoiceForm.value;
    const payload: sendTestInvoice = {
      title: formData.title,
      message: formData.message
    };

    this.loginService.sendTestInvoice(payload).subscribe(response => {
      this.loading = false;
      this.billerService.fetchInvoiceUpdateSubject.next(true);
      this.modal.closeAll();

      this.fetchProfile();
      this.notification.success(
        'Email Sent',
      response.message
      );
    }, (err: any) => {
      this.loading = false;
      this.modal.closeAll();
      this.fetchProfile();
      this.notification.error(
        'Email Not Sent',
        'We are experiencing some difficulties.Please try again later.'
      );
    });
  }

  fetchProfile() {
    const payload = {};
    this.loginService.payerProfile(payload).subscribe(response => {
      this.send_invoice = response[0].test_invoice;
      if (this.send_invoice === '1') {
        this.loginService.sendInvoicePercent = 100;
      } else {
        this.loginService.sendInvoicePercent = 0;
      }
    }), (err: any) => {

    };
  }
}
