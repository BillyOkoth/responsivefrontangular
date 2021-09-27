import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePolicyComponent } from './single-policy.component';

describe('SinglePolicyComponent', () => {
  let component: SinglePolicyComponent;
  let fixture: ComponentFixture<SinglePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
