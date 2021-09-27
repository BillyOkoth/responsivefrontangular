import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDeletedUserComponent } from './rejected-deleted-user.component';

describe('RejectedDeletedUserComponent', () => {
  let component: RejectedDeletedUserComponent;
  let fixture: ComponentFixture<RejectedDeletedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedDeletedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedDeletedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
