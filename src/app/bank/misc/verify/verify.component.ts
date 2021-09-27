import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { Router } from '@angular/router';
import {BoardingStepsService} from '../../../core/services/boarding-service/boarding.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  billerEmailtobeSent: any;
  loading = false;

  constructor(
    public boaringData: OnboardingService,
    private billerEmailservice: BoardingStepsService,

    private router: Router) { }

  ngOnInit() {
    this.billerEmailtobeSent = sessionStorage.getItem('email');
  }

  closeStep() {  // close this dialog

    this.boaringData.showOpacity = false;

    setTimeout(() => {  // allow for smooth transition

      this.boaringData.showStep1 = false;

    });
    this.router.navigate(['/admin']);
  }

  redirectToDash(): void {
    this.router.navigate(['/admin']);

  }

  cancelDialog(): void {

  }

}
