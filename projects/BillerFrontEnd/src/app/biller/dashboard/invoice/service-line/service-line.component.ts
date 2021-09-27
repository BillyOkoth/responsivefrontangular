import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { BillerService } from '../../../services/biller-service/biller.service';
import { ServiceLineModalComponent } from './service-line-modal/service-line-modal.component';
import { MenuService } from '../../../services/menu-service/menu.service';
import { UpdateServiceLineComponent } from './update-service-line/update-service-line.component';

@Component({
  selector: 'app-service-line',
  templateUrl: './service-line.component.html',
  styleUrls: ['./service-line.component.css'],
})
export class ServiceLineComponent implements OnInit {
  searchValue = '';
  rows = [];
  loading;
  constructor(
    private billerService: BillerService,
    private modalService: NzModalService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.getServiceLine();
    this.billerService.serviceLineSubject.subscribe((value) => {
      this.getServiceLine();
    });
  }

  AddAserviceLine() {
    this.modalService.create({
      nzTitle: 'Add Service Line',
      nzContent: ServiceLineModalComponent,
      nzWidth: '50%',
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  getServiceLine() {
    this.loading = true;
    const payload = {};

    this.menuService.getDepartments(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        this.rows = response;
      }
    });
  }

  EditServiceLine(data) {
    sessionStorage.setItem('serviceLine', data.service_line);
    sessionStorage.setItem('serviceCompCode', data.comp_code);
    sessionStorage.setItem('serviceCode', data.service_code);

    this.modalService.create({
      nzTitle: 'Update Service Line',
      nzContent: UpdateServiceLineComponent,
      nzWidth: '30%',
      nzFooter: null,
      nzMaskClosable: false
    });
  }
}
