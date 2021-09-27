import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectorService } from 'src/app/core/services/sectors/sector.service';
import { AddSector } from 'src/app/core/services/sectors/sector';
import { NzModalRef } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-sectors',
  templateUrl: './add-sectors.component.html',
  styleUrls: ['./add-sectors.component.scss']
})
export class AddSectorsComponent implements OnInit {
  addSectorForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private sector: SectorService, private modalRef: NzModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.addSectorForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }


  createSector() {
    this.loading = true;
    const sector = this.addSectorForm.value;
    const payload: AddSector = {
      name: sector.name,
      code: sector.code
    };
    this.sector.addSector(payload).subscribe((response: any) => {
      this.loading = false;
      this.modalRef.close();
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
