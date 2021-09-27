import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedPoliciesComponent } from './generated-policies.component';

describe('GeneratedPoliciesComponent', () => {
  let component: GeneratedPoliciesComponent;
  let fixture: ComponentFixture<GeneratedPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
