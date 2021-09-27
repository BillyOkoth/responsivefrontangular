import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { freezeUser, updateMyTeam, getGroup } from 'projects/BillerFrontEnd/src/app/service/login.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MyAccountsService } from 'projects/BillerFrontEnd/src/app/service/my-accounts service/my-accounts.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  loading: boolean;
  selectedGroup: any;
  Fname = '';
  Lname = '';
  setEmail = '';
  groupSet = '';
  roleLists = [];
  Idset = '';


  constructor(private toastr: ToastrService,
    private myaccountsService: MyAccountsService,
    private loginService: LoginService, ) { }

  ngOnInit() {
    this.getMyGroup();
   this.setEmail = sessionStorage.getItem('emailSet');
   this.Fname =  sessionStorage.getItem('fnameSet');
   this.Lname =   sessionStorage.getItem('lanameSet');
   this.groupSet =  sessionStorage.getItem('groupSet');
   this.Idset = sessionStorage.getItem('idSet');

  }

  updateTeam() {
    this.loading = true;
    if (this.selectedGroup) {
      const payload: updateMyTeam = {
        id: this.Idset,
        group_id: this.selectedGroup.group_id,
        email: this.setEmail,
        personel_l_name: this.Lname,
        personel_f_name: this.Fname
      };

      this.loginService.updateTeamMembers(payload).subscribe(
        (response: any) => {
          this.loading  = false;
          if (response.messageCode == '00') {
            this.myaccountsService.fetchTeamsSubject.next(true);
            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          } else {
          }
        },
        (err: any) => {

        }
      );

      this.loginService.updateTeamMembers(payload).subscribe(
        (response: any) => {
          if (response.messageCode == '00') {
            this.myaccountsService.fetchTeamsSubject.next(true);
            this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          }
        },
        (err: any) => {

        }
      );
    } else if (this.groupSet) {
      const payload: updateMyTeam = {
        id: this.Idset,
        group_id: this.groupSet,
        email: this.setEmail,
        personel_l_name: this.Lname,
        personel_f_name: this.Fname
      };

      this.loginService
        .updateTeamMembers(payload)
        .subscribe((response: any) => {
          if (response.messageCode == '00') {
                        this.toastr.success(response.message, 'Success');
          } else if (response.messageCode == '05') {
            this.toastr.warning(response.message, 'Warning');
          } else if (response.messageCode == '06') {
            this.toastr.warning(response.message, 'Warning');
          }
        });
    } else {
    }
  }

  getMyGroup() {
    this.loading = true;
    const payload: getGroup = {};
    this.loginService.getMyGroup(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.roleLists = response;
      },
      (err: any) => {

      }
    );
  }

  delete() {


    const payload: freezeUser = {
      email: this.setEmail
    };
   this.loading = true;
    this.loginService.freezeUser(payload).subscribe(
      (response: any) => {
        this.loading = false;
        if ((response.messageCode = '00')) {
          this.toastr.success(response.message, 'Success');

        } else if ((response.messageCode = '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '06')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {

      }
    );
  }
  restore() {

    const payload: freezeUser = {
      email: this.setEmail
    };
   this.loading = false;

    this.loginService.restoreUser(payload).subscribe(
      (response: any) => {
        if ((response.messageCode = '00')) {

          this.toastr.success(response.message, 'Success');
        } else if ((response.messageCode = '01')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '02')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '03')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '06')) {
          this.toastr.warning(response.message, 'Warning');
        } else if ((response.messageCode = '07')) {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {

        this.loading = false;
      }
    );
  }


}
