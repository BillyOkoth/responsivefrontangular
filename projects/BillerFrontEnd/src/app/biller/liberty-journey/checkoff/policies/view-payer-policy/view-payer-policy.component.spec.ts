import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayerPolicyComponent } from './view-payer-policy.component';

describe('ViewPayerPolicyComponent', () => {
  let component: ViewPayerPolicyComponent;
  let fixture: ComponentFixture<ViewPayerPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPayerPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayerPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
