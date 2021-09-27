import { Component, OnInit } from '@angular/core';
import { SectorService } from 'src/app/core/services/sectors/sector.service';
import { DeleteSector } from 'src/app/core/services/sectors/sector';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  sectorName: String;
  id: String;
  loading = false;

  constructor(private sector: SectorService, private toastr: ToastrService, private ref: NzModalRef) { }

  ngOnInit(): void {
    this.sectorName = sessionStorage.getItem('sector_name');
    this.id = sessionStorage.getItem('sector_id');
  }


  deleteSector() {
    const payload: DeleteSector = {
      id: this.id
    };
    this.sector.deleteSector(payload).subscribe((response: any) => {
      sessionStorage.removeItem('sector_name');
      sessionStorage.removeItem('sector_id');
      this.ref.close()
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message)
          break;

        default:
          this.toastr.warning(response.message)
          break;
      }
    });
  }
}
