import { Component, OnInit } from '@angular/core';
import { PoliciesService } from './services/policies.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  constructor(public policy: PoliciesService) { }

  ngOnInit() {
  }

  handleChange(e) {
    this.policy.selectedTab = e;
  }

}
