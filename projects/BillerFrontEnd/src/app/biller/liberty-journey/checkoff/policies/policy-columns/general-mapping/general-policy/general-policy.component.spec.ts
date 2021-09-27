import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPolicyComponent } from './general-policy.component';

describe('GeneralPolicyComponent', () => {
  let component: GeneralPolicyComponent;
  let fixture: ComponentFixture<GeneralPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
