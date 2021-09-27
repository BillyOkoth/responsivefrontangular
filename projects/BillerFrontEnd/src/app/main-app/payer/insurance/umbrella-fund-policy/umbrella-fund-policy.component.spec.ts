import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbrellaFundPolicyComponent } from './umbrella-fund-policy.component';

describe('UmbrellaFundPolicyComponent', () => {
  let component: UmbrellaFundPolicyComponent;
  let fixture: ComponentFixture<UmbrellaFundPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmbrellaFundPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbrellaFundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
