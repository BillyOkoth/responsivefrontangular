import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from '../../../../services/biller-service/biller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-service-line',
  templateUrl: './update-service-line.component.html',
  styleUrls: ['./update-service-line.component.css']
})
export class UpdateServiceLineComponent implements OnInit {

  serviceLine = '';
  serviceCode = '';
  compCode = '';
  loading = false;
  constructor(
    private billerService: BillerService,
    private modalService: NzModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.serviceLine = sessionStorage.getItem('serviceLine');
    this.compCode = sessionStorage.getItem('serviceCompCode');
    this.serviceCode = sessionStorage.getItem('serviceCode');
  }

  updateServiceLine() {
    this.loading = true;

    const payload = {
      comp_code: this.compCode,
      service_code: this.serviceCode,
      service_line: this.serviceLine

    };

    this.billerService.updateServiceLine(payload).subscribe(
      (response: any) => {
        this.loading = false;
        switch (response.responseCode) {
          case '00':
            this.billerService.serviceLineSubject.next(true);
            this.toastr.success(response.message, 'Success');
            this.modalService.closeAll();
            break;

          default:
            this.toastr.warning(response.message, 'Warning');
            this.modalService.closeAll();
            break;
        }
      }
    );
  }

}
