import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.component.html',
  styleUrls: ['./home-modal.component.css']
})
export class HomeModalComponent implements OnInit {

//   billerEmailtobeSent: any;

  constructor(private router: Router,
      ) { }

  ngOnInit() {

  }

  closeStep() {  // close this dialog



  }



}
