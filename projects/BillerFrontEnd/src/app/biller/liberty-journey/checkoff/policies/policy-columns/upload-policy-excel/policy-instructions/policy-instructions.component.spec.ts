import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyInstructionsComponent } from './policy-instructions.component';

describe('PolicyInstructionsComponent', () => {
  let component: PolicyInstructionsComponent;
  let fixture: ComponentFixture<PolicyInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
