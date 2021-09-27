import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillerService } from '../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.css']
})
export class CurrencyManagementComponent implements OnInit {
  forexForm;
  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;
  currencies;
  loading;
  constructor(
    private fb: FormBuilder,
    private billerService: BillerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.forexForm = this.fb.group({
      currenty: ['', [Validators.required]],
      exchangeRate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
    this.currencies = [
      { name: 'KSH' },
      { name: 'USD' },
      { name: 'GBP' },
      { name: 'EUR' }
    ];
    const payload = {};
    this.billerService.getForex(payload).subscribe((resp: any) => {
      this.loading = false;
      this.forexForm.patchValue({
        currenty: resp.currenty,
        exchangeRate: resp.rate,
        startDate: resp.start_date,
        endDate: resp.end_date
      });
    });
  }

  // dates
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

  saveCurrencyProfile() {
    const currencyForm = this.forexForm.value;
    const rate = currencyForm.exchangeRate.toString();
    const startDate = currencyForm.startDate;
    const endDate = currencyForm.endDate;
    this.loading = true;
    const payload = {
      currenty: currencyForm.currenty,
      rate: rate,
      start_date: startDate,
      end_date: endDate
    };
    this.billerService.setForex(payload).subscribe((resp: any) => {
      this.loading = false;
      switch (resp.messageCode) {
        case '00':
          this.toastr.success(resp.message);
          this.billerService.fetchInvoiceUpdateSubject.next(true);
          break;

        case '02':
          this.toastr.warning(resp.message);
          break;
        case '06':
          this.toastr.warning(resp.message);
          break;
      }
    });
  }
}
