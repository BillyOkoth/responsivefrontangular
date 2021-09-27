import { Component, OnInit } from '@angular/core';
import { BillerService } from '../services/biller-service/biller.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-biller-settings',
  templateUrl: './biller-settings.component.html',
  styleUrls: ['./biller-settings.component.css']
})
export class BillerSettingsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private billerServiice: BillerService,
    private toastr: ToastrService
  ) { }

  commission  = '';
  terms = '';
  invoice_name = '';
  invoice_color = '';
  tax = '';
  loading = false;
  brandTheme = '#0033A1';
  billerBaseColor = '#0A2240';
  biller;


  brandColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.billerBaseColor})`;

  myProfileForm = new FormGroup({
    companyname: new FormControl(''),
    email_address: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl('')
  });

  ngOnInit() {
    this.getInvoiceSettings();

    this.myProfileForm = this.fb.group({
      invoivename: ['', Validators.required],
      invoicecolor: ['', Validators.required],
      tax: ['', Validators.required],
      commission: ['', Validators.required],
      terms: ['', Validators.required]
    });


  }
  getInvoiceSettings() {
    const payload = {};

    this.billerServiice.getInvoiceSettings(payload).subscribe(
      (response: any) => {
         this.commission =  response[0].commission;
         this.tax = response[0].tax;
         this.invoice_name = response[0].invoice_name;
         this.invoice_color = response[0].invoice_color;
         this.terms = response[0].terms;
      }
    );
  }


  save() {
    this.loading = true;


    const formData = this.myProfileForm.value;


      const payload = {
        terms: formData.terms,
        tax: formData.tax,
        commission: formData.commission,
        invoice_color: this.userService.brandColor,
        invoice_name: formData.invoivename
      };

      this.billerServiice.updateInvoice(payload).subscribe(
        (response: any) => {
          this.loading = false;
          if (response.messageCode = '00') {
            this.billerServiice.fetchInvoicesUpdateSubject.next(true);
            this.toastr.success(response.message, 'Success');

          } else if (response.messageCode = '03') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode = '06') {
            this.toastr.warning(response.message, 'Warning');
          } else {}
        }
      );

}
}
