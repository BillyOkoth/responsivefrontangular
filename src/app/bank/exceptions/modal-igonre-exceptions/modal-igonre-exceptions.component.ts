import { Component, OnInit } from '@angular/core';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { Router } from '@angular/router';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-modal-igonre-exceptions',
  templateUrl: './modal-igonre-exceptions.component.html',
  styleUrls: ['./modal-igonre-exceptions.component.scss']
})
export class ModalIgonreExceptionsComponent implements OnInit {

  loading = false;
  eslipnumber ;
  createdAt;
  Amount;
  Reference;
  Ft;

  constructor(
    private eslipService: EslipsService,
    private router: Router,
    private excelData: ExcelDataService,
    private toastr: ToastrService,
    private modalService: NzModalService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.eslipnumber =  sessionStorage.getItem('restoredEslip');

    this.createdAt = sessionStorage.getItem('restoredCreatedAt');
    this.Amount = sessionStorage.getItem('restoredAmount');
    this.Reference = sessionStorage.getItem('restoredReference');
    this.Ft = sessionStorage.getItem('restoredFt');
  }
  closeDialog() {
    this.modalService.closeAll();
  }



  restorePayments() {

    const payload = {
      id:  sessionStorage.getItem('restoredId'),
    };

    this.loading = true ;

    this.eslipService.restorePayment(payload).subscribe(

      (response: any) => {
        this.loading = false;

        switch (response.messageCode) {
          case '00':
          this.eslipService.fetchRestoreExceptions.next(true);
            this.toastr.success(response.message, 'Success');
            this.modalService.closeAll();
            break;
            case '02':
              this.toastr.warning(response.message, 'warning');
              break;
              case '06':
              this.toastr.warning(response.message, 'warning');
              break;

           default:
            this.toastr.warning(response.message, 'Warning');
            break;
        }
      }
    );
  }

}
