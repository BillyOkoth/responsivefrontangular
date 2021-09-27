import { Component, OnInit } from '@angular/core';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { TeamsServiceService } from '../teams-service.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-approve-edited-bank-user-modal',
  templateUrl: './approve-edited-bank-user-modal.component.html',
  styleUrls: ['./approve-edited-bank-user-modal.component.scss']
})
export class ApproveEditedBankUserModalComponent implements OnInit {

  othernameboolean = false;
  usernameboolean =  false;
  usergroupboolean = false;
  phoneboolean = false ;
  notificationboolean = false ;

  loading = false ;
  UnEditedDetails = [];
  EditedValues = [];
  othername1 ;
  username1;
  usergroup1;
  phone1;
  notification1;
  othername2;
  username2;
  usergroup2;
  phone2;
  notification2;
  BillerName = '';
  editedEmail;
    constructor(

      private billerService: BillersService,
      private toastr: ToastrService,
      private modalService: NzModalService,
      public role: RolesService,
      private teamService: TeamsServiceService,
    ) { }

    ngOnInit() {
      this.UnEditedDetails = JSON.parse(sessionStorage.getItem('editedDetails'));


      this.username1 = sessionStorage.getItem('ApproveEditedBankUser');
      this.othername1  = sessionStorage.getItem('ApproveEditedBankUserOtherName');
      this.usergroup1 = sessionStorage.getItem('ApproveEditedBankUserGroup');
      this.phone1 = sessionStorage.getItem('ApproveEditedBankUserPhone');
      this.notification1 =   sessionStorage.getItem('ApproveEditedBankUserNotif');

      this.editedEmail =   sessionStorage.getItem('ApproveEditedBankEmail');
      this.getEditedBankUser();

      this.BillerName =  sessionStorage.getItem('ApproveEditedBankUser');
    }


    closeDialog() {
      this.modalService.closeAll();
      // this.othername1 = '';
      // this.username1  = '';
      // this.usergroup1 = '';
      // this.phone1 = '';
      // this.notification1 = '';

      // this.othername2 = '';
      // this.username2 = '';
      // this.usergroup2= '';
      // this.phone2 = '';
      // this.notification2= '';
    }

    getEditedBankUser() {
      // values that are edited.

      const payload = {};
      this.billerService.getEditedBankUser(payload).subscribe(
        (response: any) => {

          response.forEach(
            (value: any) => {


              if (this.editedEmail  == value.email ) {
                this.othername2 = value.otherName;
                this.username2  = value.username;
                this.usergroup2 = value.userGroup;
                this.phone2 = value.phone;
                this.notification2 = value.notification;
              }

          });

          this.compareValues();
        }
      );
    }

    compareValues() {

      if (this.othername1 != this.othername2) {

        this.othernameboolean = true;


      } else if (this.username1 != this.username2) {

        this.usernameboolean = true;

      } else if (this.usergroup1 != this.usergroup2) {

        this.usergroupboolean = true;

      } else if (this.phone1 != this.phone2) {

        this.phoneboolean = true;

      } else if (this.notification1 != this.notification2) {

        this.notificationboolean = true;

      } else {
      }


    }

    ApproveEditedBankUser() {

      sessionStorage.getItem('ApproveEditedBankUser');
      sessionStorage.getItem('ApproveEditedBankId');

     this.loading = true;
      const payload = {
        username:  sessionStorage.getItem('ApproveEditedBankUser'),
        id: sessionStorage.getItem('ApproveEditedBankId')
      };
      this.role.approveEditedUser(payload).subscribe(
        (response: any) => {
          this.loading = false;
          switch (response.messageCode) {
                case '02':
                  this.toastr.warning(response.message);
                  break;
                case '06':
                  this.toastr.warning(response.message);
                  break;
                default:
                  this.toastr.success(response.message);
                  this.teamService.fetchEditedUserSubject.next(true);
                  this.modalService.closeAll();

                  this.othername1 = '';
                  this.username1  = '';
                  this.usergroup1 = '';
                  this.phone1 = '';
                  this.notification1 = '';

                  this.othername2 = '';
                  this.username2 = '';
                  this.usergroup2 = '';
                  this.phone2 = '';
                  this.notification2 = '';
                  break;
              }

        }
      );

    }
    }




