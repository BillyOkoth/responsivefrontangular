import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTabComponent } from './policy-tab.component';

describe('PolicyTabComponent', () => {
  let component: PolicyTabComponent;
  let fixture: ComponentFixture<PolicyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
