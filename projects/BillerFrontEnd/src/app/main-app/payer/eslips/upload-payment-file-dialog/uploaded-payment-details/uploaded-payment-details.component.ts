import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaded-payment-details',
  templateUrl: './uploaded-payment-details.component.html',
  styleUrls: ['./uploaded-payment-details.component.css'],
})
export class UploadedPaymentDetailsComponent implements OnInit {
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  fileName;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPaymentDetails();
    this.fileName = this.loginService.fileName;
  }

  getPaymentDetails() {
    const payload = {
      file_id: this.loginService.fileId,
    };
    this.loginService.getPaymentDetails(payload).subscribe((response: any) => {
      this.rows = response;
    }, (err: any) => {

    });
  }

  onSelect({ selected }) {}

  closeView() {
    this.router.navigate(['/app/dashboard/uploaded-payment-summary']);
  }
}
