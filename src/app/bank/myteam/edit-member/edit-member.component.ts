import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { Team } from 'src/app/core/services/billers/billers.model';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
  constructor(
    private loginService: BillersService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  roleLists = <any>[];
  loading = false;

  newTeamForm = new FormGroup({
    name: new FormControl(''),
    email_address: new FormControl(''),
    phone_number: new FormControl(''),
    other_name: new FormControl(''),
    surname: new FormControl(''),
    group_id: new FormControl('')
  });

  ngOnInit() {
    this.newTeamForm = this.fb.group({
      name: ['', Validators.required],
      email_address: [
        '',
        [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]
      ],
      group_id: ['', Validators.required],
      surname: ['', Validators.required],
      phone_number: ['', Validators.required],
      other_name: ['', Validators.required]
    });

    this.getMyGroup();
  }

  createNewMemeber(): void {
    const formData = this.newTeamForm.value;

    if (this.newTeamForm.valid) {
      const payload: Team = {
        username: formData.name,
        email: formData.email_address,
        phone: formData.phone_number,
        otherName: formData.other_name,
        surname: formData.surname,
        group_id: formData.group_id
      };

      this.loading = true;



      this.loginService.registerUser(payload).subscribe(
        (response: any) => {
          this.loading = false;

        },
        err => {
          this.loading = false;
        }
      );
    }
  }

  // get usergroups

  getMyGroup() {
    const payload: {} = {};

    this.loginService.getBankUserGroup(payload).subscribe(
      (response: any) => {
        this.roleLists = response;
      },
      err => {

      }
    );
  }
  closeModal(): void {
  }

  closeStep() {


    this.router.navigate(['/dashboard/my-team']);
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.newTeamForm.controls[controlName].hasError(errorName);
  }
}
