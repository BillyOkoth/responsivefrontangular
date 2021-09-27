import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerTeamComponent } from './payer-team.component';

describe('PayerTeamComponent', () => {
  let component: PayerTeamComponent;
  let fixture: ComponentFixture<PayerTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
