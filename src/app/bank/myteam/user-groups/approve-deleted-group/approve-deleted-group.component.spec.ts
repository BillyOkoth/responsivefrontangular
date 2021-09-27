import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeletedGroupComponent } from './approve-deleted-group.component';

describe('ApproveDeletedGroupComponent', () => {
  let component: ApproveDeletedGroupComponent;
  let fixture: ComponentFixture<ApproveDeletedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeletedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeletedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
