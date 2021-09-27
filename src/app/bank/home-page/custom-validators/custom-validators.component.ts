import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { Observable, of } from "rxjs";
import { map, debounceTime, take, switchMap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value === null || value.length === 0;
}

@Component({
  selector: 'app-custom-validators',
  templateUrl: './custom-validators.component.html',
  styleUrls: ['./custom-validators.component.scss']
})
export class CustomValidatorsComponent  {
  private emailTimeout;
  constructor(

    public boaringData: OnboardingService,
    private toastr :ToastrService
  ) { }

  ngOnInit() {
  }

  emailAvailability(control) {
    clearTimeout(this.emailTimeout);
    return new Promise((resolve, reject) => {
      const payload = {
        email: control.value
      }
        this.emailTimeout = setTimeout(() => {
            this.boaringData.validateEmail(payload)
                .subscribe(
                  (response:any)=>{

                    switch (response.messageCode) {
                      case "00":         
                        this.toastr.success(response.message, "Success");
                        break;
                      default:
                        this.toastr.warning(response.message, "Warning");
                        break;
                    }
            
                  },
                    error       => {
                      return resolve({ availability: true });
                    });
        } , 600);
    });
}

  

  

}
export function ValidateEmail(control: AbstractControl) {
  if (control.value){

    const payload = {
      email :control.value
    }
    return this.boaringData.ValidateEmail(payload).subscribe(
      (response:any)=>{

        switch (response.messageCode) {
          case "00":         
            this.toastr.success(response.message, "Success");
            break;
          default:
            this.toastr.warning(response.message, "Warning");
            break;
        }

      }
    )
  }
 
  return null;
}
export function ValidateFirstName(control: AbstractControl) {
  if (!control.value.startsWith("E")){
    return { validFname: false }
  }
 
  return null;
}

export function ValidateLastName(control: AbstractControl) {
  if (!control.value.startsWith("e")){
    return { validFname: false }
  }
 
  return null;
}



