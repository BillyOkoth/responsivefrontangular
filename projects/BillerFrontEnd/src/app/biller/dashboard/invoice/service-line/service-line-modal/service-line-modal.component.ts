import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../../../services/menu-service/menu.service';

@Component({
  selector: 'app-service-line-modal',
  templateUrl: './service-line-modal.component.html',
  styleUrls: ['./service-line-modal.component.css']
})
export class ServiceLineModalComponent implements OnInit {
  createServiceLineForm: FormGroup;
  loading = false ;
  rows = [];
  billing_line = [];
  currencies = [];


  constructor(
    private billerService: BillerService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private menuService: MenuService
  ) { }


  ngOnInit() {
    this.createServiceLineForm = this.fb.group({
      specific_account: ['', Validators.required],
      service_line_name: ['', Validators.required],
      currency: ['', Validators.required],
      service_prefix: ['E'],
      prefix : ['', Validators.required],
      eslip_email: ['', [Validators.required, Validators.email]],
    });
    this.currencies = [{ name: 'KSH' }, { name: 'USD' }];
  }



  addServiceLine() {

    this.loading = true;

    this.billing_line.push({
      service_line: this.createServiceLineForm.value.service_line_name,
      account: this.createServiceLineForm.value.specific_account,
      email: this.createServiceLineForm.value.eslip_email,
      currency: this.createServiceLineForm.value.currency.name,
      prefix: this.createServiceLineForm.value.service_prefix + this.createServiceLineForm.value.prefix,
    });

    const payload = {
      billing_line: this.billing_line
    };

    this.menuService.addDepartment(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '00':
          this.billerService.serviceLineSubject.next(true);
          this.toastr.success (response.message, 'Success');
          this.modalService.closeAll();
           break;
        default :
        this.toastr.warning(response.message, 'Warning');
        this.createServiceLineForm.reset();
        break;
      }


    });
  }




}
