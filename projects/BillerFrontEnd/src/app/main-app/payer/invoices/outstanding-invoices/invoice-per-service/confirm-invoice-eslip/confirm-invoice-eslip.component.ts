import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from 'projects/BillerFrontEnd/src/app/service/biller-service/biller.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-invoice-eslip',
  templateUrl: './confirm-invoice-eslip.component.html',
  styleUrls: ['./confirm-invoice-eslip.component.css']
})
export class ConfirmInvoiceEslipComponent implements OnInit {

  loading = false;
  errormsgs = [];
  disabled = false;
  zeroValues;
  eslipAccounts: any;
  eslipData: any;

  totalAmountToPay;

  constructor(
    public billerService: BillerService,
    private router: Router,

    private toastr: ToastrService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.zeroValues = this.billerService.zeroValuesLength;
    this.eslipAccounts = this.billerService.accountInEslip;
    this.eslipData = JSON.parse(sessionStorage.getItem('eslipInvoice-payload'));

    this.eslipData.forEach(
      (value: any) => {
        console.log('total', value.total_amount_to_pay);
        this.totalAmountToPay = value.total_amount_to_pay;

    });
  }

  generateEslip() {
    this.loading = true;
    this.disabled = false;

    const payload = {
      selection: this.eslipData
    };
    this.billerService.generateEslip(payload).subscribe((response: any) => {
      this.loading = false;

      this.modalService.closeAll();
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);

          this.router.navigate(['/app/dashboard/generated-e-slip']);

          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });

  }


  closeDialog() {
    this.modalService.closeAll();
  }

}
