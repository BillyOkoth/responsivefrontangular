import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPoliciesComponent } from './set-policies.component';

describe('SetPoliciesComponent', () => {
  let component: SetPoliciesComponent;
  let fixture: ComponentFixture<SetPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
