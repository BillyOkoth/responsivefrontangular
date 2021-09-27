import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { TeamsServiceService } from '../teams-service.service';

@Component({
  selector: 'app-confirm-team',
  templateUrl: './confirm-team.component.html',
  styleUrls: ['./confirm-team.component.scss']
})
export class ConfirmTeamComponent implements OnInit {

  loading =  false ;
  user_name;
  constructor( private modalService: NzModalService,
    public teamService: TeamsServiceService,
    private toastr: ToastrService, ) { }

  ngOnInit() {
    this.user_name = sessionStorage.getItem('USERNAME');
  }


  deleteUser() {

      this.loading = true;
    const payload = {
      username:   this.user_name
    };
    this.teamService.deleteBankUser(payload).subscribe((response: any) => {
      this.loading = false;
      switch (response.messageCode) {
        case '02':
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
          break;
        case '06':
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
          break;
        case '07':
          this.toastr.warning(response.message, 'Warning');
          this.modalService.closeAll();
          break;
        default:
          this.modalService.closeAll();
          this.toastr.success(response.message, 'Success');
        this.teamService.fetchActiveTeamSubject;
          break;
      }
    });


  }


  closeDialog() {
    this.modalService.closeAll();

  }

}
