import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTeamComponent } from './confirm-team.component';

describe('ConfirmTeamComponent', () => {
  let component: ConfirmTeamComponent;
  let fixture: ComponentFixture<ConfirmTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
