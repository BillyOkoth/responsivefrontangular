import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerTeamMembersComponent } from './biller-team-members.component';

describe('BillerTeamMembersComponent', () => {
  let component: BillerTeamMembersComponent;
  let fixture: ComponentFixture<BillerTeamMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerTeamMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
