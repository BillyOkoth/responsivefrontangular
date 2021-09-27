import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  cols = [];
  rows = [];
  selectedRows = [];
  selected: any[];
  loading = false;
  searchValue = '';
  aa = false;

  isIndeterminate = false;
  isAllDisplayDataChecked = false;
  allRights;
  alertRights;

  constructor(
    private alertsService: AlertsService,
    private toastr: ToastrService,
    public role: RolesService
  ) {}

  ngOnInit() {
    this.getAlerts();
    // this.findRights()

  }

  getAlerts() {
    this.loading = true;
    const payload = {};

    this.alertsService.emailAlerts(payload).subscribe((response: any) => {
      this.loading = false;
      this.rows = response;
    });
  }

  // findRights() {
  //   this.allRights = JSON.parse(sessionStorage.getItem("menuRights"));
  //   this.allRights.forEach(element => {
  //     if (element.menuName == "Alerts and Logs") {
  //       this.alertRights = element.roles;
  //     }
  //   });

  //   if (this.alertRights.length > 0) {
  //     this.alertRights.forEach(value => {
  //       if (value.role == "all") {
  //         this.role.alertRole= value.status;
  //       }
  //     });
  //   } else {
  //     this.role.alertRole = true;
  //   }
  // }

  onSelect() {
    const selected = [];
    this.selectedRows.forEach(value => {
      selected.push({ id: value.id });
    });

    this.selected = selected;
  }
  delete() {
    const payload = {
      alerts: this.selected
    };

    this.alertsService.deleteAlerts(payload).subscribe(
      (response: any) => {
        if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');

          this.ngOnInit();
          this.selectedRows = [];
        } else if (response.messageCode == '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode == '06') {
          this.toastr.warning(response.message, 'Warning');
        } else {
        }
      },
      (err: any) => {}
    );
  }

  updateSingleChecked(value) {
    if (value.checked == true) {
      this.selectedRows.push(value);
      // this.payTotal();
      // this.sumTotal();

      this.onSelect();
    } else {
      this.selectedRows = this.selectedRows.filter(value => {
        return value.checked == true;
      });
      this.onSelect();
    }
  }

  setIndex(ii) {
    this.aa = ii;
  }

  updateAllChecked(): void {
    this.isIndeterminate = false;
    if (this.isAllDisplayDataChecked) {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: true
        };
      });
      this.selectedRows = this.rows;
      this.onSelect();
    } else {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: false
        };
      });

      this.selectedRows = this.selectedRows.filter(value => {
        return value.checked == true;
      });

      this.selectedRows = [];

      this.onSelect();
    }
  }
}
