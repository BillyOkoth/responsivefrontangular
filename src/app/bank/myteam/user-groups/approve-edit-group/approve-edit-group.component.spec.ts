import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditGroupComponent } from './approve-edit-group.component';

describe('ApproveEditGroupComponent', () => {
  let component: ApproveEditGroupComponent;
  let fixture: ComponentFixture<ApproveEditGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
