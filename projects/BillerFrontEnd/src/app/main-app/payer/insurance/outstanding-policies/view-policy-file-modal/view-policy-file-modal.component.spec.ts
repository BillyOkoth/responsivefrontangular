import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolicyFileModalComponent } from './view-policy-file-modal.component';

describe('ViewPolicyFileModalComponent', () => {
  let component: ViewPolicyFileModalComponent;
  let fixture: ComponentFixture<ViewPolicyFileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPolicyFileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPolicyFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
