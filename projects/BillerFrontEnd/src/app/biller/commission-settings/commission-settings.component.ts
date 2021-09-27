import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { from } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-commission-settings',
  templateUrl: './commission-settings.component.html',
  styleUrls: ['./commission-settings.component.css']
})
export class CommissionSettingsComponent implements OnInit {
  commisionsForm;
  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;
  applicable;
  toSpecific = false;
  payers = [];
  loading;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private billerService: BillerService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.commisionsForm = this.fb.group({
      commisionName: ['', [Validators.required]],
      commisionRate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      toAll: ['', [Validators.required]],
      selectedPayer: ['']
    });
    this.applicable = [
      { name: 'To All', checked: 'false' },
      { name: 'To Specific', checked: 'false' }
    ];
    this.fetchMyPayers();
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }

  }

  handleEndOpenChange(open: boolean): void {

    this.endOpen = open;
  }

  onSelectCharge(e) {
    if (e.toLowerCase() == 'specific') {
      this.toSpecific = true;
    } else {
      this.toSpecific = false;
    }
  }

  fetchMyPayers() {
    const payload = {};
    this.billerService.getMyPayers(payload).subscribe((resp: any) => {
      this.payers = resp;
    });
  }

  fetchProfile() {
    const payload = {};
    this.loginService.payerProfile(payload).subscribe(response => {
      this.loginService.commissionPercentage = parseInt(
        response[0].commission_percentage,
        10
      );
    }),
      (err: any) => {};
  }

  saveCommission() {
    const commissionData = this.commisionsForm.value;
    this.loading = true;
    const payload = {
      name: commissionData.commisionName,
      rate: commissionData.commisionRate,
      start_date: commissionData.startDate,
      end_date: commissionData.endDate,
      type: commissionData.toAll,
      biller_code: sessionStorage.getItem('comp_code'),
      payer_code: commissionData.selectedPayer
    };

    this.billerService.setCommisions(payload).subscribe((resp: any) => {
      this.loading = false;
      switch (resp.messageCode) {
        case '00':
          this.toastr.success(resp.message);
          this.billerService.fetchInvoiceUpdateSubject.next(true);
          this.billerService.fetchCommissionsUpdateSubject.next(true);

          this.commisionsForm.reset();
          this.modalService.closeAll();
          break;

        default:
          this.toastr.info(resp.message);
          break;
      }
    });
  }
}
