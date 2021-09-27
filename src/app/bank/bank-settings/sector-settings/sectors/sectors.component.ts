import { Component, OnInit } from '@angular/core';
import { SectorService } from 'src/app/core/services/sectors/sector.service';
import { NzModalService } from 'ng-zorro-antd';
import { AddSectorsComponent } from '../add-sectors/add-sectors.component';
import { map } from 'rxjs/operators';
import { DeleteSector } from 'src/app/core/services/sectors/sector';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { UploadSectorComponent } from '../upload-sector/upload-sector.component';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  sectors = [];
  searchValue: String;
  loading = false;

  constructor(private sector: SectorService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getSectors();
  }

  getSectors() {
    this.loading = true;
    const payload = {};
    this.sector.getSectors(payload).subscribe((response: any) => {
      this.loading = false;
      this.sectors = response;
    });
  }

  addSectors() {
    const modal = this.modal.create({
      nzTitle: 'Add Sector',
      nzContent: AddSectorsComponent,
      nzFooter: null,
      nzWidth: '50%',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getSectors();
    });
  }

  editSectors() {
    const modal = this.modal.create({
      nzTitle: 'Edit Sector',
      nzContent: AddSectorsComponent,
      nzFooter: null,
      nzWidth: '50%',
      nzMaskClosable: false
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getSectors();
    });
  }

  deleteSector(value) {


    sessionStorage.setItem('sector_name', value.name),
      sessionStorage.setItem('sector_id', value.id);
    const modal = this.modal.create({
      nzTitle: 'Delete Sector',
      nzContent: ConfirmDeleteComponent,
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%'
    });
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getSectors();
    });
  }

  uploadSector() {
    const modal = this.modal.create({
      nzTitle: "Upload list of Sectors",
      nzContent: UploadSectorComponent,
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: "50%"
    })
    modal.afterClose.pipe(map(() => { })).subscribe(() => {
      this.getSectors();
    });
  }
}
