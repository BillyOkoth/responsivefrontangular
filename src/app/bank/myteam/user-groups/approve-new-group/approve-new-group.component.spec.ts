import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveNewGroupComponent } from './approve-new-group.component';

describe('ApproveNewGroupComponent', () => {
  let component: ApproveNewGroupComponent;
  let fixture: ComponentFixture<ApproveNewGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveNewGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveNewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
