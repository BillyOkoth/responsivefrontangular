import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPayerComponent } from './policy-payer.component';

describe('PolicyPayerComponent', () => {
  let component: PolicyPayerComponent;
  let fixture: ComponentFixture<PolicyPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
